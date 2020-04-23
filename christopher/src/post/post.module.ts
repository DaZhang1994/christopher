import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '../common/common.module';
import { PostSchema } from './schemas/post.schema';
import { PostService } from './services/post.service';
import { UserModule } from '../user/user.module';
import { PostResolver } from './resolvers/post.resolver';
import { ThreadModule } from '../thread/thread.module';
import { ThreadLoader } from './dataloaders/thread.loader';
import { UserLoader } from './dataloaders/user.loader';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Post',
      schema: PostSchema,
      collection: 'posts'
    }]),
    CommonModule,
    forwardRef(() => UserModule),
    forwardRef(() => ThreadModule)
  ],
  providers: [PostService, PostResolver, ThreadLoader, UserLoader],
  exports: [PostService]
})
export class PostModule {}
