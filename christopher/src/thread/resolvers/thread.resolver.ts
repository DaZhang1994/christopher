import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UpdateThreadArgs } from '../args/update_thread.args';
import { Thread } from '../models/thread.model';
import { ThreadService } from '../services/thread.service';
import { AddThreadArgs } from '../args/add_thread.args';
import { Post } from '../../post/models/post.model';
import { UseInterceptors } from '@nestjs/common';
import { AllPostLoaderInterceptor } from '../dataloaders/all_post.loader';


@Resolver(_of => Thread)
export class ThreadResolver {
  constructor(private readonly threadService: ThreadService) {

  }

  // @Admin()
  @Mutation(_returns => Boolean)
  async addThread(@Args() threadArgs: AddThreadArgs, @Context() context: any) {
    const thread: Thread = await this.threadService.initMeta(threadArgs, context.req.token._id);
    await this.threadService.addOne(thread);
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
    await this.threadService.updateById(threadArgs.threadId, threadArgs.desThread);
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

}
