import { Injectable } from '@nestjs/common';
import { Post } from './model/post';
import { PostService } from './post.service';
import { OrderedNestDataLoader } from 'nestjs-graphql-dataloader';

@Injectable()
export class PostLoader extends OrderedNestDataLoader<number, Post> {
  constructor(private readonly postService: PostService) {
    super();
  }

  // generateDataLoader(): DataLoader<number, Post> {
  //   console.log('generate');
  //   return new DataLoader<number, Post>(keys => this.postService.findAll());
  // }

  protected getOptions = () => ({
    query: async (keys: number[]) => {
      const res = await this.postService.findByIds(keys);
      console.log(res);
      return res;
    }
  })

}
