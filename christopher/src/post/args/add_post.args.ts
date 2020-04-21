import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class AddPostArgs {

  @Field(_type => String)
  @IsString()
  title: string;

  @Field(_type => String)
  @IsString()
  content: string;

  @Field(_type => String)
  @IsString()
  thread: string;

}
