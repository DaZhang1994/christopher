import { Token } from '../entities/token.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/models/user.model';

@Injectable()
export class TokenService {

  constructor(private readonly jwtService: JwtService) {

  }

  async generateAsync(user: User): Promise<string> {
    return this.jwtService.signAsync({ username: user.username, _id: user._id, role: user.role } );
  }

  generate(user: User): string {
    return this.jwtService.sign({ username: user.username, _id: user._id, role: user.role } );
  }

  async parseAsync(token: string): Promise<Token> {
    return this.jwtService.verifyAsync(token);
  }

  parse(token: string): Token {
    return this.jwtService.verify(token);
  }
}
