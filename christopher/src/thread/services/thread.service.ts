import { Injectable } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { Thread } from '../models/thread.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ThreadService extends BaseService<Thread>{

  constructor(@InjectModel('Thread') private ThreadModel) {
    super(ThreadModel);
  }

}
