import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';
import { IsDate, IsOptional, IsString, Matches } from 'class-validator';
import { Post } from '../../post/models/post.model';
import { User } from '../../user/models/user.model';


@ObjectType()
export class Thread extends BaseModel {

  @Field(_type => String, { nullable: true })
  @Matches(/^[0-9a-fA-F]{24}$/)
  @IsString()
  @IsOptional()
  _id?: string;

  @Field(_type => String, { nullable: true })
  @IsString()
  @IsOptional()
  subject?: string;

  @Field(_type => Int, { nullable: true })
  @IsString()
  @IsOptional()
  status?: number;

  @Field(_type => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  createdTime?: Date;

  @Field(_type => User, { nullable: true })
  @IsString()
  @IsOptional()
  author?: string | User;

  @Field(_type => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  lastUpdateDate?: Date;

  @Field(_type => [Post], { nullable: true })
  posts?: Post[];

}
