import { CacheModule, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { UserModule } from '../user/user.module';
const Config = require(`../../config/${process.env.NODE_ENV}`);
import { JwtModule } from '@nestjs/jwt';
import * as RedisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secretOrKeyProvider: () => Config.token.secrets,
      signOptions: { expiresIn: '24h' }
    }),
    CacheModule.register({
      store: RedisStore,
      host: Config.cache.url,
      port: Config.cache.port,
      password: Config.cache.password
    })],
  providers: [AuthService, AuthResolver],
  exports: [AuthService, AuthResolver]
})
export class AuthModule {}
