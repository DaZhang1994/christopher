import { ArgsType, Field } from '@nestjs/graphql';
import { ThreadInput } from '../inputs/thread.input';
import { ValidateNested } from 'class-validator';

@ArgsType()
export class AddThreadArgs {

  @Field(_type => ThreadInput)
  @ValidateNested()
  thread: ThreadInput;

}
