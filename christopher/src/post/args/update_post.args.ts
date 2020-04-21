import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, Matches, ValidateNested } from 'class-validator';
import { PostInput } from '../inputs/post.input';

@ArgsType()
export class UpdatePostArgs {

  @Matches(/^[0-9a-fA-F]{24}$/)
  @IsString()
  _id: string;

  @Field(_type => PostInput)
  @ValidateNested()
  desPost: PostInput;
}
