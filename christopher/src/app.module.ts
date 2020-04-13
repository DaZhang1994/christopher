import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthorModule } from './author/author.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-graphql-dataloader'
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
const Config = require(`../config/${process.env.NODE_ENV}`);
import * as RedisStore from 'cache-manager-redis-store';


@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      debug: true,
      playground: true,
      tracing: true,
      cacheControl: {
        defaultMaxAge: 600,
        stripFormattedExtensions: false,
        calculateHttpHeaders: true
      }
    }),
    CacheModule.register({
      store: RedisStore,
      host: Config.cache.url,
      port: Config.cache.port,
      password: Config.cache.password
    }),
    MongooseModule.forRoot(Config.db.connUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true }),
    AuthorModule,
    AuthModule,
    UserModule,
    CommonModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor }]
})
export class AppModule {}
