import { Token } from '../entities/token.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {

  constructor(private readonly jwtService: JwtService) {

  }

  async generateAsync(username: string): Promise<string> {
    return this.jwtService.signAsync({ username: username } );
  }

  generate(username: string): string {
    return this.jwtService.sign({ username: username } );
  }

  async parseAsync(token: string): Promise<Token> {
    return this.jwtService.verifyAsync(token);
  }

  parse(token: string): Token {
    return this.jwtService.verify(token);
  }
}
