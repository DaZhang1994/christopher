import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UpdateThreadArgs } from '../args/update_thread.args';
import { Thread } from '../models/thread.model';
import { ThreadService } from '../services/thread.service';
import { AddThreadArgs } from '../args/add_thread.args';
import { Post } from '../../post/models/post.model';
import { UseInterceptors } from '@nestjs/common';
import { AllPostLoaderInterceptor } from '../dataloaders/all_post.loader';
import { User } from '../../user/models/user.model';
import { Loader } from 'nestjs-graphql-dataloader';
import DataLoader from 'dataloader';
import { UserLoader } from '../dataloaders/user.loder';


@Resolver(_of => Thread)
export class ThreadResolver {
  constructor(private readonly threadService: ThreadService) {

  }

  // @Admin()
  @Mutation(_returns => Boolean)
  async addThread(@Args() threadArgs: AddThreadArgs, @Context() context: any) {
    await this.threadService.addThread(threadArgs, context.req.token._id);
    return true;
  }

  // @Admin()
  @Mutation(_returns => Boolean)
  async deleteThread(@Args('threadId') threadId: string) {
    await this.threadService.deleteById(threadId);
    return true;
  }

  // @Admin()
  @Mutation(_returns => Boolean)
  async updateThread(@Args() threadArgs: UpdateThreadArgs) {
    await this.threadService.updateThreadById(threadArgs.threadId, threadArgs.desThread);
    return true;
  }

  @Query(_returns => Thread)
  async thread(@Args('threadId') threadId: string) {
    return this.threadService.findById(threadId);
  }

  @Query(_returns => [Thread])
  @UseInterceptors(AllPostLoaderInterceptor)
  async threads(@Context() context: any) {
    return this.threadService.findAll();
  }

  @ResolveField(_returns => [Post])
  async posts(@Parent() thread: Thread, @Context() context: any) {
    await context.req.batchLoadPosts();
    return context.req.refMap.get(thread._id.toString());
  }

  @ResolveField(_returns => User)
  async author(@Parent() thread: Thread, @Loader(UserLoader) userLoader: DataLoader<string, User>) {
    return userLoader.load(thread.author.toString());
  }

}
