import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import * as RedisStore from 'cache-manager-redis-store';
const Config = require(`../../config/${process.env.NODE_ENV}`);

@Module({
  imports: [
    CacheModule.register({
      store: RedisStore,
      host: Config.cache.url,
      port: Config.cache.port,
      password: Config.cache.password
    }),
    MongooseModule.forFeature([{
      name: 'User',
      schema: UserSchema,
      collection: 'users'
    }])
  ],
  providers: [UserService, UserResolver],
  exports: [UserService, UserResolver]
})
export class UserModule {}
