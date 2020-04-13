import { Injectable } from '@nestjs/common';
import { Post } from './model/post';
import { Author } from './model/author';

@Injectable()
export class PostService {
  private  posts: Post[] = [{
    id: 1,
    content: 'This is 1st post content.'
  },
    {
    id: 2,
    content: 'This is 2nd post content.'
  },
    {
      id: 3,
      content: 'This is 3rd post content.'
    },
  ];

  async findOne(uid: readonly number[]): Promise<Post[]> {
    return this.posts;
  }

  async findByIds(ids: number[]): Promise<Post[]> {
    console.log('hahaha');
    return this.posts.filter(post => ids.includes(post.id));
  }


  async findAll() {
    return this.posts;
  }
}
