import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Token } from '../../common/decorators/token.decorator';
import { Loader } from 'nestjs-graphql-dataloader';
import DataLoader from 'dataloader';
import { PostInput } from '../inputs/post.input';
import { PostService } from '../services/post.service';
import { UpdatePostArgs } from '../args/update_post.args';
import { Post } from '../models/post.model';
import { User } from '../../user/models/user.model';
import { UserLoader } from '../dataloaders/user.loader';
import { isString } from '@nestjs/common/utils/shared.utils';

@Resolver(_of => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {

  }

  @Token()
  @Mutation(_returns => Boolean)
  async addPost(@Args('post') postArgs: PostInput, @Context() context: any): Promise<boolean> {
    const post: Post = await this.postService.initMeta(postArgs, context.req.token._id);
    await this.postService.addOne(post);
    return true;
  }

  @Token()
  @Mutation(_returns => Boolean)
  async deletePost(@Args('postId') postId: string, @Context() context: any): Promise<boolean> {
    await this.postService.validateMeta(postId, context.req.token._id);
    await this.postService.deleteById(postId);
    return true;
  }

  @Token()
  @Mutation(_returns => Boolean)
  async updatePost(@Args() postArgs: UpdatePostArgs, @Context() context: any): Promise<boolean> {
    await this.postService.validateMeta(postArgs._id, context.req.token._id);
    await this.postService.updateById(postArgs._id, postArgs.desPost);
    return true;
  }

  @Query(_returns => [Post])
  async posts(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @ResolveField(_returns => User)
  async author(@Parent() post: Post, @Loader(UserLoader) userLoader: DataLoader<string, User>) {
    let author: User = null;
    if(isString(post.author)) {
      author = await userLoader.load(post.author);
    }
    if(author instanceof Error) {
      return null;
    }
    return author;
  }

}
