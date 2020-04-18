import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ThreadSchema } from './schemas/thread.schema';
import { ThreadService } from './services/thread.service';
import { ThreadLoader } from './dataloaders/thread.loader';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Thread',
      schema: ThreadSchema,
      collection: 'threads'
    }]),
    CommonModule],
  providers: [ThreadService, ThreadLoader],
  exports: [ThreadService, ThreadLoader]
})
export class ThreadModule {}
