import { Injectable } from '@nestjs/common';
import { OrderedNestDataLoader } from 'nestjs-graphql-dataloader';
import { Thread } from '../models/thread.model';
import { ThreadService } from '../services/thread.service';

@Injectable()
export class ThreadLoader extends OrderedNestDataLoader<Thread['_id'], Thread> {
  constructor(private readonly threadService: ThreadService) {
    super();
  }

  protected getOptions = () => ({
    query: async (threadIds: string[]) => {
      return this.threadService.findByIds(threadIds);
    }
  })

}
