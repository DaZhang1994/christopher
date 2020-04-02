import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
const Config = require(`../../config/${process.env.NODE_ENV}`);
import { Token } from './interfaces/token.interface';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Config.token.secrets
    });
  }

  async validate(token: Token) {
    if(token.loggedIn) {
      return this.authService.assignToken({ username: token.username })
    }
    return false;
  }
}
