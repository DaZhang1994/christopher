import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-graphql-dataloader';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenInterceptor } from './common/interceptors/token.interceptor';
import { CommonModule } from './common/common.module';
import { ThreadModule } from './thread/thread.module';
import { PostModule } from './post/post.module';
import { RoleInterceptor } from './common/interceptors/role.interceptor';
import { RefreshTokenInterceptor } from './common/interceptors/refresh_token.interceptor';

const Config = require(`../config/${process.env.NODE_ENV}`);


@Module({
  imports: [
    GraphQLModule.forRoot({
      context: ({ req, res }) => ({ req, res }),
      fieldResolverEnhancers: ['guards', 'interceptors'],
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
    MongooseModule.forRoot(Config.db.connUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true }),
    AuthModule,
    UserModule,
    CommonModule,
    ThreadModule,
    PostModule
  ],
  providers: [
    { provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor },
    { provide: APP_INTERCEPTOR,
      useClass: TokenInterceptor },
    { provide: APP_INTERCEPTOR,
      useClass: RefreshTokenInterceptor },
    { provide: APP_INTERCEPTOR,
      useClass: RoleInterceptor }]
})
export class AppModule {}
