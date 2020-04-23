import { One2ManyLoader } from '../../common/dataloaders/one2many.loader';
import { Post } from '../../post/models/post.model';
import { Injectable } from '@nestjs/common';
import { PostService } from '../../post/services/post.service';

@Injectable()
export class PostLoader extends One2ManyLoader<Post> {

  constructor(private readonly postService: PostService) {
    super(
      postService,
      'user2PostSet',
      'user2PostMap',
      'author',
      'user2PostBatch',
      'user2PostMutex');
  }

}
