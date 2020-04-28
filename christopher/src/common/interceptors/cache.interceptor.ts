import { CACHE_MANAGER, CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import * as rxjs from 'rxjs';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { CacheMeta } from '../entities/cache_meta.entity';

@Injectable()
export class CacheInterceptor implements NestInterceptor {

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: any, private readonly reflector: Reflector) {

  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {

    const cacheMeta: CacheMeta = this.reflector.get('Cache', context.getHandler());
    if(cacheMeta == null) {
      return next.handle();
    }

    const cacheData = await this.cacheManager.get(cacheMeta.key);

    if(cacheData) {
      return rxjs.of(cacheData);
    }

    return next.handle().pipe(tap(data => {
      const args = cacheMeta.ttl ? [cacheMeta.key, data, {ttl: cacheMeta.ttl}] : [cacheMeta.key, data];
      this.cacheManager.set(...args);
    }));
  }
}
