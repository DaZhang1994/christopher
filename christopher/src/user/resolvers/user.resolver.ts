import { Context, Query, Resolver } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Token } from '../../common/decorators/token.decorator';

@Resolver(_of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {

  }

  @Token()
  @Query(_returns => User)
  async user(@Context() context) {
    return this.userService.findOne({ username: context.req.token.username });
  }
}
