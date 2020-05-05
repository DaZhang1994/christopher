import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Token } from '../../common/decorators/token.decorator';
import { Loader } from 'nestjs-graphql-dataloader';
import DataLoader from 'dataloader';
import { PostService } from '../services/post.service';
import { UpdatePostArgs } from '../args/update_post.args';
import { Post } from '../models/post.model';
import { User } from '../../user/models/user.model';
import { UserLoader } from '../dataloaders/user.loader';
import { AddPostArgs } from '../args/add_post.args';
import { Thread } from '../../thread/models/thread.model';
import { ThreadLoader } from '../dataloaders/thread.loader';
import { RefreshToken } from '../../common/decorators/refresh_token.decorator';


@Resolver(_of => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {

  }

  @Query(_returns => Post)
  async post(@Args('postId') postId: string): Promise<Post> {
    return await this.postService.findById(postId) || {};
  }

  @Token()
  @Mutation(_returns => Boolean)
  async addPost(@Args() postArgs: AddPostArgs, @Context() context: any): Promise<boolean> {
    await this.postService.addPost(postArgs, context.req.token._id);
    return true;
  }

  @Token()
  @Mutation(_returns => Boolean)
  async deletePost(@Args('postId') postId: string, @Context() context: any): Promise<boolean> {
    await this.postService.deletePostById(postId, context.req.token._id);
    return true;
  }

  @Token()
  @Mutation(_returns => Boolean)
  async updatePost(@Args() postArgs: UpdatePostArgs, @Context() context: any): Promise<boolean> {
    await this.postService.updatePostById(postArgs._id, postArgs.desPost, context.req.token._id);
    return true;
  }

  @RefreshToken()
  @Query(_returns => [Post])
  async posts(): Promise<Post[]> {
    return await this.postService.findAll() || [];
  }

  @ResolveField(_returns => User)
  async author(@Parent() post: Post, @Loader(UserLoader) userLoader: DataLoader<string, User>) {
    let author = null;
    try {
      author = await userLoader.load(post.author.toString());
    }
    catch(e) {
      return null;
    }
    return author;
  }

  @ResolveField(_returns => Thread)
  async thread(@Parent() post: Post, @Loader(ThreadLoader) threadLoader: DataLoader<string, Thread>) {
    let thread = null;
    try {
      thread = await threadLoader.load(post.thread.toString());
    }
    catch(e) {
      return null;
    }
    return thread;
  }

}
