import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../models/post.model';
import { PostStatus } from '../constants/status.constant';

@Injectable()
export class PostService extends BaseService<Post>{

  constructor(@InjectModel('Post') private readonly UserModel) {
    super(UserModel);
  }

  async addPost(post: Post, authorId: string) {
    post.author = authorId;
    return this.addOne(post);
  }

  async deletePostById(postId: string, userId: string) {
    const post: Post = await this.findById(postId);

    if(post.author != userId) {
      throw new UnauthorizedException('Unauthorized post author!');
    }

    return this.deleteById(post._id);
  }

  async updatePostById(postId: string, post: Post, userId: string) {
    if(post.status != PostStatus.VALID) {
      throw new BadRequestException('Invalid post status!')
    }

    if(post.author != userId) {
      throw new UnauthorizedException('Unauthorized post author!');
    }

    return this.updateById(postId, post);
  }

}
