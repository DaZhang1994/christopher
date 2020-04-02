import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) : Promise<any> {
    const user = await this.authService.validateUsername(username);
    if(user) {
      return this.authService.assignTempToken(user);
    }
    return false;
  }
}
