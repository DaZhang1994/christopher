import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as RandomString from 'randomstring';
import { User } from '../users/interfaces/user.entity';
import { HexBase64Latin1Encoding } from "crypto";
import { CryptoService } from '../tools/crypto/crypto.service';

@Injectable()
export class AuthService {
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

  async assignTempToken(user: User) {
    return {
      token: this.jwtService.sign({
        username: user.username,
        loggedIn: false,
        salt: RandomString.generate(64),
        saltExp: Date.now() + 5 * 60 * 1000})};
  }

  async assignToken(user: User) {
    return {
      token: this.jwtService.sign({
        username: user.username,
        loggedIn: true,
        salt: '',
        saltExp: -1})};
  }
}
