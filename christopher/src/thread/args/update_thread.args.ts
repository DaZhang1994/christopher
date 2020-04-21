import { ArgsType, Field } from '@nestjs/graphql';
import { ThreadInput } from '../inputs/thread.input';
import { ValidateNested } from 'class-validator';

@ArgsType()
export class UpdateThreadArgs {

  @Field(_type => String)
  threadId: string;

  @Field(_type => ThreadInput)
  @ValidateNested()
  desThread: ThreadInput;
}
