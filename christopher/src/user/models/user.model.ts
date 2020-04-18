import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsEmail, IsInt, IsIP, IsOptional, IsPhoneNumber, IsUrl, Matches } from 'class-validator';
import { BaseModel } from '../../common/models/base.model';
import { Thread } from '../../thread/models/thread.model';

@ObjectType()
export class User extends BaseModel {

  _id?: string;

  @Field({ nullable: true })
  @Matches(/^[A-Za-z_]\w{5,15}$/)
  @IsOptional()
  username?: string;

  @Matches(/[a-fA-F0-9]{32}/)
  @IsOptional()
  password?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsPhoneNumber("US")
  @IsOptional()
  telephone?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  emailVerified?: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  telephoneVerified?: boolean;

  @Field(_type => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  role?: number;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  avatarURI?: string;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  createdTime?: Date;

  @Field({ nullable: true })
  @IsIP()
  @IsOptional()
  lastLoginIP?: string;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  lastLoginTime?: Date;

  @Field(_type => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  status?: number;

  @Field(_type => [Thread], { nullable: true})
  threads?: Thread[];

  threadIds?: string[];

}
