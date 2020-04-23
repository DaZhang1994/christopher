import { One2ManyLoader } from './one2many.loader';
import { Post } from '../../post/models/post.model';
import { Injectable } from '@nestjs/common';
import { PostService } from '../../post/services/post.service';

@Injectable()
export class PostLoader extends One2ManyLoader<Post> {

  constructor(private readonly postService: PostService) {
    super(
      postService,
      'thread2PostSet',
      'thread2PostMap',
      'thread',
      'thread2PostBatch',
      'thread2PostMutex');
  }

}
