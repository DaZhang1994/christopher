import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtLoginStrategy } from './login-jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ToolsModule } from '../tools/tools.module';
const Config = require(`../../config/${process.env.NODE_ENV}`);

@Module({
  imports: [
    UsersModule,
    ToolsModule,
    PassportModule,
    JwtModule.register({
      secret: Config.token.secrets,
      signOptions: { expiresIn: '24h' }
    }),
  ],
  providers: [AuthService, JwtLoginStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
