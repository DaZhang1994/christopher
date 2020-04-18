import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Author } from './model/author';
import { PostLoader } from './post.loader';
import { Loader } from 'nestjs-graphql-dataloader';
import { Post } from './model/post';
import DataLoader from 'dataloader';


@Resolver(_of => Author)
export class AuthorResolver {
  constructor(private readonly authorsService: AuthorService) {

  }

  @Query(_returns => Author, { name: 'author'})
  async getAuthor(@Args('id') id: number) {
    return this.authorsService.findOneById(id);
  }

  @Query(_returns => [Author], { name: 'authors'})
  async getAuthors() {
    return this.authorsService.findAll();
  }

  @ResolveField('posts', _returns => [Post])
  async posts(@Parent() author: Author, @Loader(PostLoader.name) postLoader: DataLoader<Post['id'], Post>){
    console.log('aaa');
    // return await this.postService.findByIds(author.postIds);
    return postLoader.loadMany(author.postIds);
  }
}

