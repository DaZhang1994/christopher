import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UpdateThreadArgs } from '../args/update_thread.args';
import { Thread } from '../models/thread.model';
import { ThreadService } from '../services/thread.service';
import { AddThreadArgs } from '../args/add_thread.args';
import { Post } from '../../post/models/post.model';
import { User } from '../../user/models/user.model';
import { Loader } from 'nestjs-graphql-dataloader';
import DataLoader from 'dataloader';
import { UserLoader } from '../dataloaders/user.loder';
import { PostLoader } from '../dataloaders/post.loader';
import { Role } from '../../common/decorators/role.decorator';
import { UserRole } from '../../user/constants/role.constant';
import { Token } from '../../common/decorators/token.decorator';
import { RefreshToken } from '../../common/decorators/refresh_token.decorator';

@Resolver(_of => Thread)
export class ThreadResolver {
  constructor(private readonly threadService: ThreadService, private readonly postLoader: PostLoader) {

  }

  @Role(UserRole.ADMIN)
  @Token()
  @Mutation(_returns => Boolean)
  async addThread(@Args() threadArgs: AddThreadArgs, @Context() context: any) {
    await this.threadService.addThread(threadArgs, context.req.token._id);
    return true;
  }

  @Role(UserRole.ADMIN)
  @Token()
  @Mutation(_returns => Boolean)
  async deleteThread(@Args('threadId') threadId: string) {
    await this.threadService.deleteById(threadId);
    return true;
  }

  @Role(UserRole.ADMIN)
  @Token()
  @Mutation(_returns => Boolean)
  async updateThread(@Args() threadArgs: UpdateThreadArgs) {
    await this.threadService.updateThreadById(threadArgs.threadId, threadArgs.desThread);
    return true;
  }

  @RefreshToken()
  @Query(_returns => Thread)
  async thread(@Args('threadId') threadId: string) {
    return await this.threadService.findById(threadId) || {};
  }

  @RefreshToken()
  @Query(_returns => [Thread])
  async threads(@Context() context: any) {
    return await this.threadService.findAll() || [];
  }

  @ResolveField(_returns => [Post])
  async posts(@Parent() thread: Thread, @Context() context: any) {
    return this.postLoader.load(thread._id.toString(), context.req);
  }

  @ResolveField(_returns => User)
  async author(@Parent() thread: Thread, @Loader(UserLoader) userLoader: DataLoader<string, User>) {
    let author = null;
    try {
      author = await userLoader.load(thread.author.toString());
    }
    catch(e) {
      return null;
    }
    return author;
  }

}
