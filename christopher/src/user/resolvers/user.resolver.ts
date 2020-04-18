import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Token } from '../../common/decorators/token.decorator';
import { AddUserArgs } from '../args/add_user.args';
import { UpdateUserArgs } from '../args/update_user.args';
import { TokenService } from '../../common/services/token.service.';
import { Loader } from 'nestjs-graphql-dataloader';
import { Thread } from '../../thread/models/thread.model';
import { ThreadLoader } from '../../thread/dataloaders/thread.loader';
import DataLoader from 'dataloader';

@Resolver(_of => User)
export class UserResolver {
  constructor(private readonly userService: UserService,
              private readonly tokenService: TokenService) {

  }

  @Token()
  @Query(_returns => User)
  async user(@Context() context) {
    return this.userService.findOne({ username: context.req.token.username });
  }

  @Mutation(_returns => Boolean)
  async addUser(@Args() addUserArgs: AddUserArgs) {
    await this.userService.addOne(addUserArgs);
    return true;
  }

  @Token()
  @Mutation(_returns => Boolean)
  async deleteUser(@Context() context: any) {
    await this.userService.deleteOne({ username: context.req.token.username });
    return true;
  }

  @Token()
  @Mutation(_returns => Boolean)
  async updateUser(@Context() context: any, @Args() updateUserArgs: UpdateUserArgs) {
    const updatedUser: User = await this.userService.updateOne({ username: context.req.token.username }, updateUserArgs);
    context.res.setHeader('authorization', await this.tokenService.generateAsync(updatedUser.username));
    return true;
  }

  @Query(_returns => [User])
  async users() {
    return this.userService.findAll();
  }

  @ResolveField(_returns => [Thread])
  async threads(@Parent() user: User, @Loader(ThreadLoader.name) threadLoader: DataLoader<Thread['_id'], Thread>){
    return threadLoader.loadMany(user.threadIds);
  }

}
