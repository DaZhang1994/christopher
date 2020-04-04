import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { validate } from 'class-validator';
import { AuthService } from '../auth.service';
import { AuthDto } from '../dtos/auth.dto';
import { Token } from '../entities/token.entity';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private readonly authService: AuthService) {

  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const req = context.switchToHttp().getRequest();
    const body = req.body;

    const token: Token = this.authService.verifyToken(req.headers.authorization);

    return new Promise((resolve, reject) => {
      this.authService.validateToken(token).
      then(token => {
        if(token) {
          req.token = this.authService.assignToken({ username: token.username } );
          return resolve(true);
        }
      }).
      then(() => validate(new AuthDto(body.username, body.password))).
      then(err => {
        if(err.length > 0) {
          return Promise.reject(new BadRequestException('Invalid username or password!'));
        }
      }).
      then(() => this.authService.validateUser(body.username, body.password, 'sha256', token.salt, 'base64')).
      then(user => {
        if (!user) {
          return Promise.reject(new UnauthorizedException('Unauthorized username or password!'));
        }
        return user;
      }).
      then(user => this.authService.assignToken(user)).
      then(token => {
        req.token = token;
        return resolve(true);
      }).
      catch(e => reject(e))
    });

  }
}
