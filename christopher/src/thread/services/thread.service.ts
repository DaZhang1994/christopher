import { Injectable } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { Thread } from '../models/thread.model';
import { InjectModel } from '@nestjs/mongoose';
import { PostStatus } from '../../post/constants/post.status';

@Injectable()
export class ThreadService extends BaseService<Thread>{

  constructor(@InjectModel('Thread') private readonly ThreadModel) {
    super(ThreadModel);
  }

  async initMeta(thread: Thread, authorId: string) {
    thread.author = authorId;
    thread.createdTime = new Date();
    thread.status = PostStatus.VALID;
    return thread;
  }


}
