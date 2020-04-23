import { Injectable } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { Thread } from '../models/thread.model';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class ThreadService extends BaseService<Thread>{

  constructor(@InjectModel('Thread') private readonly ThreadModel) {
    super(ThreadModel);
  }

  async addThread(thread: Thread, authorId: string) {
    thread.author = authorId;
    return this.addOne(thread);
  }

  async updateThreadById(threadId: string, desThread: Thread) {
    desThread.lastUpdateDate = new Date();
    return this.updateById(threadId, desThread);
  }

}
