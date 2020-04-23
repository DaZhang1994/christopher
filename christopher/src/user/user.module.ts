import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { CommonModule } from '../common/common.module';
import { PostLoader } from './dataloaders/post.loader';
import { PostModule } from '../post/post.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'User',
      schema: UserSchema,
      collection: 'users'
    }]),
    CommonModule,
    forwardRef(() => PostModule)
  ],
  providers: [UserService, UserResolver, PostLoader],
  exports: [UserService]
})
export class UserModule {}
