import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { IdentifierInput } from '../dtos/identifier.input';
import { IdentifierValidator } from '../validators/identifier.validator';
import { UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '../../common/interceptors/cache/cache.interceptor';
import { Cache } from '../../common/decorators/cache.decorator';

@Resolver(_of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {

  }

  @Query(_returns => User)
  @UseInterceptors(CacheInterceptor)
  @Cache('user', 5)
  async user(@Args('identifier', IdentifierValidator) identifier: IdentifierInput) {
    return await this.userService.findOne(identifier);
  }
}
