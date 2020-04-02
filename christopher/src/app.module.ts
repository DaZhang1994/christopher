import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
const Config = require(`../config/${process.env.NODE_ENV}`);
import { ToolsModule } from './tools/tools.module';

@Module({
  imports: [AuthModule,
            UsersModule,
            MongooseModule.forRoot(Config.db.connUrl, {
              useNewUrlParser: true,
              useUnifiedTopology: true }),
            ToolsModule],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
