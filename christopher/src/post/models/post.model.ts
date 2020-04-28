import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsDate, IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { BaseModel } from '../../common/models/base.model';
import { Thread } from '../../thread/models/thread.model';
import { User } from '../../user/models/user.model';
import { PostStatus } from '../constants/status.constant';

@ObjectType()
export class Post extends BaseModel {

  @Field(_type => String, { nullable: true })
  @Matches(/^[0-9a-fA-F]{24}$/)
  @IsString()
  @IsOptional()
  _id?: string;

  @Field(_type => String, { nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Field(_type => String, { nullable: true })
  @IsString()
  @IsOptional()
  content?: string;

  @Field(_type => Int, { nullable: true })
  @IsEnum(PostStatus)
  @IsOptional()
  status?: PostStatus;

  @Field(_type => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  createdTime?: Date;

  @Field(_type => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  lastUpdateDate?: Date;

  @Field(_type => Thread, { nullable: true })
  @IsString()
  @IsOptional()
  thread?: string | Thread;

  @Field(_type => User, { nullable: true })
  @IsString()
  @IsOptional()
  author?: string | User;
}
