import { forwardRef, Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ThreadSchema } from './schemas/thread.schema';
import { ThreadService } from './services/thread.service';
import { ThreadLoader } from './dataloaders/thread.loader';
import { UserModule } from '../user/user.module';
import { ThreadResolver } from './resolvers/thread.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Thread',
      schema: ThreadSchema,
      collection: 'threads'
    }]),
    CommonModule,
    forwardRef(() => UserModule)],
  providers: [ThreadService, ThreadLoader, ThreadResolver],
  exports: [ThreadService, ThreadLoader]
})
export class ThreadModule {}
