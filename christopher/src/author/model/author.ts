import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from './post';

@ObjectType()
export class Author {
  @Field(type => Int)
  id: number;
  @Field({ nullable: true })
  firstName?: string;
  @Field({ nullable: true })
  lastName?: string;
  @Field(type => Int)
  pid?: number;
  @Field(type => [Post])
  posts?: Post[];
  @Field(type => [Int])
  postIds?: number[];
}
