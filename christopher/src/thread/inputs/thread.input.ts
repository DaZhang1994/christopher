import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ThreadInput {

  @Field(_type => String, { nullable: true })
  subject?: string;

  @Field(_type => Int, { nullable: true })
  status?: number;

}
