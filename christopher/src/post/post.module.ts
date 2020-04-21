import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '../common/common.module';
import { PostSchema } from './schemas/post.schema';
import { PostService } from './services/post.service';
import { UserModule } from '../user/user.module';
import { PostResolver } from './resolvers/post.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Post',
      schema: PostSchema,
      collection: 'posts'
    }]),
    CommonModule,
    forwardRef(() => UserModule)
  ],
  providers: [PostService, PostResolver],
  exports: [PostService]
})
export class PostModule {}
