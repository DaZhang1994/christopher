import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
const Config = require(`../config/${process.env.NODE_ENV}`);

async function bootstrap() {
  // use express as base framework for nest
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // setup static content path
  app.useStaticAssets(path.join(__dirname, '..', Config.publicContent.folderName), {
    prefix: '/static/'
  });

  // setup cookie parser and its signature
  app.use(cookieParser(Config.cookie.signature));

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));

  // start listening to server port
  await app.listen(3000);
}
bootstrap().catch(e => console.error(e));
