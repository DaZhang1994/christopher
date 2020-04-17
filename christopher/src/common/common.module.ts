import { CacheModule, Module } from '@nestjs/common';
import { BaseService } from './services/base.service';
import * as RedisStore from 'cache-manager-redis-store';
import { CacheInterceptor } from './interceptors/cache/cache.interceptor';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './services/token.service.';

const Config = require(`../../config/${process.env.NODE_ENV}`);

@Module({
  imports: [
    JwtModule.register({
      secretOrKeyProvider: () => Config.token.secrets,
      signOptions: { expiresIn: '24h' }
    }),
    CacheModule.register({
      store: RedisStore,
      host: Config.cache.url,
      port: Config.cache.port,
      password: Config.cache.password
    }),
  ],
  providers: [BaseService, CacheInterceptor, TokenService],
  exports: [BaseService, CacheInterceptor, TokenService, JwtModule, CacheModule]
})
export class CommonModule {}
