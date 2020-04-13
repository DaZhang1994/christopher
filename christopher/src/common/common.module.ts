import { CacheModule, Module } from '@nestjs/common';
import { BaseService } from './services/base/base.service';
import * as RedisStore from 'cache-manager-redis-store';
import { CacheInterceptor } from './interceptors/cache/cache.interceptor';
const Config = require(`../../config/${process.env.NODE_ENV}`);

@Module({
  imports: [
    CacheModule.register({
      store: RedisStore,
      host: Config.cache.url,
      port: Config.cache.port,
      password: Config.cache.password
    }),
  ],
  providers: [BaseService, CacheInterceptor],
  exports: [BaseService, CacheInterceptor]
})
export class CommonModule {}
