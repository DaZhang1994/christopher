import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
const Config = require(`../../config/${process.env.NODE_ENV}`);
import { Token } from './interfaces/token.interface';
import { CryptoService } from '../tools/crypto/crypto.service';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { validate, Validator } from 'class-validator';
import { AuthDto } from './dtos/auth.dto';
const validator = new Validator();

@Injectable()
export class JwtLoginStrategy extends PassportStrategy(Strategy, 'jwtLogin') {
  constructor(
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
    private readonly authService: AuthService) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: Config.token.secrets,
        passReqToCallback: true
      });
  }

  async validate(req: Request, token: Token) {

    if(validator.isNotEmpty(token) &&
      token.loggedIn == true &&
      token.salt == '' &&
      token.saltExp == -1) {
        return this.authService.assignToken({ username: token.username });
    }

    const body: any = req.body;

    const err = await validate(new AuthDto(body.username, body.password));

    if(err.length > 0) {
      throw new BadRequestException('Invalid username or password!');
    }

    if(body.username != token.username || token.saltExp < Date.now()) {
         return false;
    }

    const user = await this.authService.validateUser(body.username, body.password, 'sha256', token.salt, 'base64');

    if(user) {
      return this.authService.assignToken(user);
    }

    return false;
  }
}
