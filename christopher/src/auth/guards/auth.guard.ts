import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly authService: AuthService) {

  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const req = context.switchToHttp().getRequest();

    const token = this.authService.verifyToken(req.headers.authorization);

    return new Promise((resolve, reject) => {
      this.authService.validateToken(token).
      then(token => {
        if(token) {
          req.token = this.authService.assignToken({ username: token.username } );
          return resolve(true);
        }
        return Promise.reject(new UnauthorizedException('Unauthorized!'));
      }).
      catch(e => reject(e));
    });

  }
}
