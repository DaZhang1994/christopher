import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Token } from './interfaces/token.interface';
import { UsersService } from '../users/users.service';
import * as Crypto from 'crypto'

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {

  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const req = context.switchToHttp().getRequest();
    const body = req.body;
    const token: Token = req.user.token;

    if(token.loggedIn == true || token.salt == undefined || token.saltExp == -1) {
      return true;
    }

    if(body.username == null || body.username == '' || body.password == null || body.password == '') {
      return false;
    }

    const saltedReqPwd = Crypto.createHmac('sha256', token.salt).update(body.password).digest('base64');

    return new Promise((resolve) => {
      this.usersService.findUser({username: body.username})
        .then(user => {
          if(user) {
            if(token.saltExp >= Date.now()) {
              const saltedPwd = Crypto.createHmac('sha256', token.salt).update(user.password).digest('base64');
              if(saltedPwd == saltedReqPwd) {
                resolve(true);
              }
            }
          }
          resolve(false);
        })
        .catch(e => {
          console.error(e);
          resolve(false);
        });
    });
  }
}
