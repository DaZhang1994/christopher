import { Args, Parent, Query, ResolveField, ResolveProperty, Resolver } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Author } from './model/author';
import { PostService } from './post.service';
import { PostLoader } from './post.loader';
import { Loader } from 'nestjs-graphql-dataloader';
import { Post } from './model/post';
import DataLoader from 'dataloader';


@Resolver(of => Author)
export class AuthorResolver {
  constructor(private readonly authorsService: AuthorService, private readonly postService: PostService) {

  }

  @Query(returns => Author, { name: 'author'})
  async getAuthor(@Args('id') id: number) {
    return this.authorsService.findOneById(id);
  }

  @Query(returns => [Author], { name: 'authors'})
  async getAuthors(@Loader(PostLoader.name) postLoader: DataLoader<Post['id'], Post>) {
    const authors: Author[] = await this.authorsService.findAll();
    return authors;
  }

  @ResolveField('posts', returns => [Post])
  async posts(@Parent() author: Author, @Loader(PostLoader.name) postLoader: DataLoader<Post['id'], Post>){
    console.log('aaa');
    // return await this.postService.findByIds(author.postIds);
    return await postLoader.loadMany(author.postIds);
  }
}

