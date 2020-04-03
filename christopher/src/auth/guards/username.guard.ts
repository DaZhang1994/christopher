import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UsernameDto } from '../dtos/username.dto';
import { validate } from 'class-validator';



@Injectable()
export class UsernameGuard implements CanActivate {

  constructor(private readonly authService: AuthService) {

  }

  // Promise.resolve() and resolve() are different
  // Promise.reject() and reject() are different
  // resolve() and reject() will NOT stop the Promise chain, but Promise.reject() will (but needs to add 'return' before Promise.reject()).
  // Be aware of the usages of Promise.resolve(), Promise.reject(), resolve() an reject() below!
  // P.S. Why dont they make canActive() an async method?
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const req = context.switchToHttp().getRequest();
    const body = req.body;

    return new Promise((resolve, reject) => {
      validate(new UsernameDto(body.username)).
      then(err => {
        if(err.length > 0) {
          return Promise.reject(new BadRequestException('Invalid username!'));
        }
      }).
      then(() => {
        return this.authService.validateUsername(body.username);
      }).
      then(user => {
        if (!user) {
          return Promise.reject(new UnauthorizedException('Unauthorized!'));
        }
        return user;
      }).
      then(user => {
        return this.authService.assignTempToken(user)
      }).
      then(token => {
          req.user = token;
          return resolve(true);
      }).
      catch(e => reject(e));
    });
  }

}
