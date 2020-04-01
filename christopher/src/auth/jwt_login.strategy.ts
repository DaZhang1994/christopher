import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { config } from '../../config/config';
import { Token } from './interfaces/token.interface';

@Injectable()
export class JwtLoginStrategy extends PassportStrategy(Strategy, 'jwtLogin') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.token.secrets
    });
  }

  async validate(token: Token) {
    return {
      token: {
        username: token.username,
        loggedIn: token.loggedIn,
        salt: token.salt,
        saltExp: token.saltExp}
      }
  }
}
