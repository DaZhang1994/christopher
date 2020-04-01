import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import { config } from '../config/config'

async function bootstrap() {
  // use express as base framework for nest
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // setup static content path
  app.useStaticAssets(path.join(__dirname, '..', config.publicContent.folderName), {
    prefix: '/static/'
  });

  // setup cookie parser and its signature
  app.use(cookieParser(config.cookie.signature));

  // start listening to server port
  await app.listen(3000);
}
bootstrap().catch(e => console.error(e));
