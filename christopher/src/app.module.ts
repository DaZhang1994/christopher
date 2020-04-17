import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthorModule } from './author/author.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-graphql-dataloader';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenInterceptor } from './common/interceptors/token/token.interceptor';
import { CommonModule } from './common/common.module';

const Config = require(`../config/${process.env.NODE_ENV}`);


@Module({
  imports: [
    GraphQLModule.forRoot({
      context: ({ req, res }) => ({ req, res }),
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
    AuthorModule,
    AuthModule,
    UserModule,
    CommonModule
  ],
  providers: [
    { provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor },
    { provide: APP_INTERCEPTOR,
      useClass: TokenInterceptor }]
})
export class AppModule {}
