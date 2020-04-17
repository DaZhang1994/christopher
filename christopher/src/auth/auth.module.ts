import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { UserModule } from '../user/user.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    UserModule,
    CommonModule],
  providers: [AuthService, AuthResolver],
  exports: [AuthService]
})
export class AuthModule {}
