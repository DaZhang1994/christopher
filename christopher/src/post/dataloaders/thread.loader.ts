import { Injectable } from '@nestjs/common';
import { OrderedNestDataLoader } from 'nestjs-graphql-dataloader';
import { ThreadService } from '../../thread/services/thread.service';
import { Thread } from '../../thread/models/thread.model';

@Injectable()
export class ThreadLoader extends OrderedNestDataLoader<string, Thread> {
  constructor(private readonly threadService: ThreadService) {
    super();
  }

  protected getOptions = () => ({
    query: async (threadIds: string[]) => {
      return this.threadService.findByIds(threadIds);
    }
  })
}
