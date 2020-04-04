import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { validate } from 'class-validator';
import { AuthService } from '../auth.service';
import { AuthDto } from '../dtos/auth.dto';
import { Token } from '../entities/token.entity';
import { User } from '../../users/interfaces/user.entity';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private readonly authService: AuthService) {

  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const req = context.switchToHttp().getRequest();
    const body = req.body;

    const token: Token = await this.authService.validateToken(req.headers.authorization);

    if(Token.isLoggedIn(token)) {
      req.token = await this.authService.assignToken({ username: token.username } );
      return true;
    }

    if(token.username != body.username) {
      throw new BadRequestException('Username mismatching!');
    }

    if(Token.tempTokenExpired(token)) {
      throw new UnauthorizedException('Temp token expired!');
    }

    const err = await validate(new AuthDto(body.username, body.password));
    if(err.length > 0) {
      throw new BadRequestException('Invalid username or password!');
    }

    const user: User = await this.authService.validateUser(body.username, body.password, 'sha256', token.salt, 'base64');
    if(!user) {
      throw new UnauthorizedException('Unauthorized username or password!');
    }

    req.token = await this.authService.assignToken(user);

    return true;
  }
}
