import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Token } from '../entities/token.entity';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly authService: AuthService) {

  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const req = context.switchToHttp().getRequest();

    const token = await this.authService.validateToken(req.headers.authorization);

    if(!Token.isLoggedIn(token)) {
      throw new UnauthorizedException(`Not logged in!`);
    }

    req.token = await this.authService.assignToken({ username: token.username } );
    return true;
  }
}
