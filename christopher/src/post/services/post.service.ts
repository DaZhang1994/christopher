import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../models/post.model';
import { PostStatus } from '../constants/post.status';

@Injectable()
export class PostService extends BaseService<Post>{

  constructor(@InjectModel('Post') private readonly UserModel) {
    super(UserModel);
  }

  async initMeta(post: Post, authorId: string) {
    post.author = authorId;
    post.createdTime = new Date();
    post.status = PostStatus.VALID;
    return post;
  }

  async validateMeta(postId: string, authorId: string) {
    const post: Post = await this.findById(postId);

    if(post.status != PostStatus.VALID) {
      throw new BadRequestException('Invalid post status!')
    }

    if(post.author !== authorId) {
      throw new UnauthorizedException('Unauthorized post author!');
    }
  }

}
