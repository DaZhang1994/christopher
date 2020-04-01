import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as RandomString from 'randomstring';
import { User } from '../users/interfaces/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUsername(username: string) {
    return await this.usersService.findUser({username: username});
  }

  async validateUser(username: string, password: string): Promise<any> {
    return await this.usersService.findUser({username: username, password: password});
  }

  async assignTempToken(user: User) {
    return {
      token: this.jwtService.sign({
        username: user.username,
        loggedIn: false,
        salt: RandomString.generate(64),
        saltExp: Date.now() + 5 * 60 * 1000})};
  }

  async login(user: User) {
    return {
      token: this.jwtService.sign({
        username: user.username,
        loggedIn: true,
        salt: '',
        saltExp: -1})};
  }
}
