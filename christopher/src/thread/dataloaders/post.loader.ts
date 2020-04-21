import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PostService } from '../../post/services/post.service';
import { Thread } from '../models/thread.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class PostLoaderInterceptor implements NestInterceptor {

  constructor(private readonly postService: PostService) {

  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    return next.handle().pipe(tap(threads => {
      this.setupBatch(threads, GqlExecutionContext.create(context).getContext());
    }));
  }

  setupBatch(threads: Thread[], context: any) {
    const threadIds: string[] = threads.map(thread => thread._id);
    const batchPromise = new Promise(async resolve => {
      if(context.req.refMap == null) {
        context.req.refMap = new Map();
        (await this.postService.findAndGroupByIds('thread', threadIds)).map(entry => {
          context.req.refMap.set(entry._id.toString(), entry.collection);
        })
        resolve(true);
      }
    });
    context.req.batchLoadPosts = () => batchPromise;
  }
}
