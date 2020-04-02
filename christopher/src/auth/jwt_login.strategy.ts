import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { config } from '../../config/config';
import { Token } from './interfaces/token.interface';
import { CryptoService } from '../tools/crypto/crypto.service';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtLoginStrategy extends PassportStrategy(Strategy, 'jwtLogin') {
  constructor(
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
    private readonly authService: AuthService) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: config.token.secrets,
        passReqToCallback: true
      });
  }

  async validate(req: Request, token: Token) {

    const body: any = req.body;

    if(token.loggedIn == true && token.salt == '' && token.saltExp == -1) {
      return this.authService.assignToken({ username: token.username });
    }

    if(body.username == null || body.username == '' || body.username != token.username ||
       body.password == null || body.password == '' ||
       token.saltExp < Date.now()) {
         return false;
    }

    const user = await this.authService.validateUser(body.username, body.password, 'sha256', token.salt, 'base64');

    if(user) {
      return this.authService.assignToken(user);
    }

    return false;
  }
}
