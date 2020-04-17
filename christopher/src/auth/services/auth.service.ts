import { BadRequestException, CACHE_MANAGER, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthArgs } from '../dtos/auth.args';
import { UserService } from '../../user/services/user.service';
import { IdentifierInput } from '../../common/dtos/identifier.input';
import { v4 as uuid } from 'uuid';
import { User } from '../../user/models/user.model';
import * as hmacSHA256 from 'crypto-js/hmac-sha256';
import * as Base64 from 'crypto-js/enc-base64';
import { TokenService } from '../../common/services/token.service.';

@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: any,
              private readonly userService: UserService,
              private readonly tokenService: TokenService) {

  }

  async assignToken(authArgs: AuthArgs): Promise<string> {

    const user: User = await this.userService.findOne(authArgs.identifier);
    if(user == null) {
      throw new UnauthorizedException('Unauthorized identifier!');
    }

    const loginToken = await this.cacheManager.get(user.username);
    if(loginToken == null) {
      throw new BadRequestException('No login token!');
    }

    if(authArgs.password != await Base64.stringify(hmacSHA256(user.password, loginToken))) {
      throw new UnauthorizedException('Unauthorized identifier and password!')
    }

    await this.cacheManager.del(user.username);

    return this.tokenService.generate(user.username);
  }

  async assignLoginToken(identifier: IdentifierInput): Promise<string> {

    const user: User = await this.userService.findOne(identifier);
    if(user == null) {
      throw new UnauthorizedException('Unauthorized identifier!');
    }

    const loginToken: string = uuid();

    this.cacheManager.set(user.username, loginToken, { ttl: 30 });

    this.logger.log(`USERNAME: ${user.username}, HASHED PASSWORD: ${await Base64.stringify(hmacSHA256(user.password, loginToken))}`);

    return loginToken;
  }

}
