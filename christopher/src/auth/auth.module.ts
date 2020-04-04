import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ToolsModule } from '../tools/tools.module';
const Config = require(`../../config/${process.env.NODE_ENV}`);

@Module({
  imports: [
    UsersModule,
    ToolsModule,
    JwtModule.register({
      secretOrKeyProvider: () => Config.token.secrets,
      signOptions: { expiresIn: '24h' }
    }),
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
