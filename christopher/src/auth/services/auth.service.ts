import { Injectable } from '@nestjs/common';
import { Auth } from '../models/auth.model';
import { AuthArgs } from '../dtos/auth.args';
import { UserService } from '../../user/services/user.service';
import { IdentifierInput } from '../../user/dtos/identifier.input';
import { Token } from '../models/token.model';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService) {

  }

  async auth(authArgs: AuthArgs) {
    const auth = new Auth();
    auth.isAuthenticated = true;
    return auth;
  }

  async getToken(identifier: IdentifierInput) {
    const token = new Token();
    token.content = 'dazhang1994';
    return token;
  }

  async getLoginToken(identifier: IdentifierInput) {
    const token = new Token();
    token.content = 'dazhang1994';
    return token;
  }
}
