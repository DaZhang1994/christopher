import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ThreadInput {

  @Field(_type => String, { nullable: true })
  name: string;

  @Field(_type => [String], { nullable: true})
  users?: string[];
}
