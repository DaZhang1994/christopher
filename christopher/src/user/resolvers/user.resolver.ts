import { Args, Context, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Token } from '../../common/decorators/token.decorator';
import { AddUserArgs } from '../args/add_user.args';
import { UpdateUserArgs } from '../args/update_user.args';
import { TokenService } from '../../common/services/token.service.';
import { PostLoader } from '../dataloaders/post.loader';
import { Post } from '../../post/models/post.model';


@Resolver(_of => User)
export class UserResolver {
  constructor(private readonly userService: UserService,
              private readonly tokenService: TokenService,
              private readonly postLoader: PostLoader) {

  }

  @Token()
  @Query(_returns => User)
  async user(@Context() context) {
    return this.userService.findById(context.req.token._id);
  }

  @Mutation(_returns => Boolean)
  async addUser(@Args() addUserArgs: AddUserArgs) {
    await this.userService.addOne(addUserArgs);
    return true;
  }

  @Token()
  @Mutation(_returns => Boolean)
  async deleteUser(@Context() context: any) {
    await this.userService.deleteById(context.req.token._id);
    return true;
  }

  @Token()
  @Mutation(_returns => Boolean)
  async updateUser(@Context() context: any, @Args() updateUserArgs: UpdateUserArgs) {
    const updatedUser: User = await this.userService.updateById(context.req.token._id , updateUserArgs);
    context.res.setHeader('authorization', await this.tokenService.generateAsync(updatedUser));
    return true;
  }

  @Query(_returns => [User])
  async users() {
    return this.userService.findAll();
  }

  @ResolveField(_returns => [Post])
  async posts(@Context() context: any) {
    return this.postLoader.load(context.req.token._id, context.req);
  }

}
