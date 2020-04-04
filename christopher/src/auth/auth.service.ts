import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as RandomString from 'randomstring';
import { User } from '../users/interfaces/user.entity';
import { HexBase64Latin1Encoding } from "crypto";
import { CryptoService } from '../tools/crypto/crypto.service';
import { Token } from './entities/token.entity';
import { validate, Validator } from 'class-validator';
const validator = new Validator();
const Config = require(`../../config/${process.env.NODE_ENV}`);

@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly  cryptoService: CryptoService
  ) {}

  async validateUsername(username: string) {
    return await this.usersService.findUser({username: username});
  }

  async validateUser(username: string, password: string, pwdHashAlg?: string, secrets?: string, encoding?: HexBase64Latin1Encoding): Promise<any> {
    const user = await this.validateUsername(username);
    if(user) {
      const saltedReqPwd = this.cryptoService.encrypt(pwdHashAlg, secrets, password, encoding);
      const saltedPwd = this.cryptoService.encrypt(pwdHashAlg, secrets, user.password, encoding);
      if(saltedPwd == saltedReqPwd) {
        return user;
      }
    }
    return null;
  }

  verifyToken(authHeader: string) {

    if(validator.isEmpty(authHeader)) {
      throw new BadRequestException('Missing authorization header!');
    }

    const auth: Array<string> = authHeader.split(' ');

    if(validator.isEmpty(auth) || auth.length < 2 || auth[0] != 'Bearer') {
      throw new BadRequestException('Invalid authorization header!');
    }

    const tokenHeader: string = auth[1];

    let token: Token = undefined;

    try {
      token = this.jwtService.verify(tokenHeader);
    }
    catch (e) {
      throw new UnauthorizedException('Unauthorized token!');
    }

    if(validator.isEmpty(token)) {
      throw new BadRequestException('Missing token!');
    }
    return token;
  }

  async validateToken(token: Token){
    const err = await validate(new Token(token));
    if(err.length > 0) {
      throw new UnauthorizedException('Unauthorized token structure!');
    }
    if(token.loggedIn == true && token.salt == '' && token.saltExp == -1) {
      return token;
    }
    else {
      return null;
    }
  }

  assignTempToken(user: User) {
    this.logger.debug(Config.token.secrets);
    return {
      token: this.jwtService.sign({
        username: user.username,
        loggedIn: false,
        salt: RandomString.generate(128),
        saltExp: Date.now() + 5 * 60 * 1000})};
  }

  assignToken(user: User) {
    this.logger.debug(Config.token.secrets);
    return {
      token: this.jwtService.sign({
        username: user.username,
        loggedIn: true,
        salt: '',
        saltExp: -1})};
  }
}
