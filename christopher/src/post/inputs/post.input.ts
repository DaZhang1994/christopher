import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class PostInput {

  @Field(_type => String, { nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Field(_type => String, { nullable: true })
  @IsString()
  @IsOptional()
  content?: string;

  @Field(_type => String, { nullable: true })
  @IsString()
  @IsOptional()
  thread?: string;

}
