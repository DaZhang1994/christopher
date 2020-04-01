import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtLoginStrategy } from './jwt_login.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../../config/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: config.token.secrets,
      signOptions: { expiresIn: '24h' }
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtLoginStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
