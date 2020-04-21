import { forwardRef, Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ThreadSchema } from './schemas/thread.schema';
import { ThreadService } from './services/thread.service';
import { ThreadResolver } from './resolvers/thread.resolver';
import { PostModule } from '../post/post.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Thread',
      schema: ThreadSchema,
      collection: 'threads'
    }]),
    CommonModule,
    forwardRef(() => PostModule)
  ],
  providers: [ThreadService, ThreadResolver],
  exports: [ThreadService]
})
export class ThreadModule {}
