import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AddThreadArgs } from '../args/add_thread.args';
import { UpdateThreadArgs } from '../args/update_user.args';
import { Loader } from 'nestjs-graphql-dataloader';
import { Thread } from '../models/thread.model';
import DataLoader from 'dataloader';
import { ThreadService } from '../services/thread.service';
import { DeleteThreadArgs } from '../args/delete_thread.args';
import { UserLoader } from '../../user/dataloaders/user.loader';
import { User } from '../../user/models/user.model';

@Resolver(_of => Thread)
export class ThreadResolver {
  constructor(private readonly threadService: ThreadService) {

  }

  @Mutation(_returns => Boolean)
  async addThread(@Args() addThreadArgs: AddThreadArgs) {
    await this.threadService.addOne(addThreadArgs.thread);
    return true;
  }

  @Mutation(_returns => Boolean)
  async deleteThread(@Args() deleteThreadArgs: DeleteThreadArgs) {
    await this.threadService.deleteOne(deleteThreadArgs.thread);
    return true;
  }

  @Mutation(_returns => Boolean)
  async updateThread(@Args() updateThreadArgs: UpdateThreadArgs) {
    await this.threadService.updateOne(updateThreadArgs.oriThread, updateThreadArgs.desThread);
    return true;
  }

  @Query(_returns => [Thread])
  async threads() {
    return this.threadService.findAll();
  }

  @ResolveField(_returns => [User])
  async users(@Parent() thread: Thread, @Loader(UserLoader) userLoader: DataLoader<string | User, User>) {
    return (await userLoader.loadMany(thread.users)).filter(user => !(user instanceof Error));
  }

}
