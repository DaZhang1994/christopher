import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';
import { User } from '../../user/models/user.model';
import { IsOptional, IsString, Matches } from 'class-validator';

@ObjectType()
export class Thread extends BaseModel {

  @Matches(/^[0-9a-fA-F]{24}$/)
  @IsString()
  @IsOptional()
  _id?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(_type => [User], { nullable: true })
  users?: (string | User)[];

}
