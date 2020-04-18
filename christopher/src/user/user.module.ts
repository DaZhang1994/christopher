import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { CommonModule } from '../common/common.module';
import { ThreadModule } from '../thread/thread.module';
import { UserLoader } from './dataloaders/user.loader';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'User',
      schema: UserSchema,
      collection: 'users'
    }]),
    CommonModule,
    forwardRef(() => ThreadModule)
  ],
  providers: [UserService, UserResolver, UserLoader],
  exports: [UserService, UserLoader]
})
export class UserModule {}
