import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsIP,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';
import { BaseModel } from '../../common/models/base.model';
import { Post } from '../../post/models/post.model';
import { UserRole } from '../constants/role.constant';
import { UserStatus } from '../constants/status.constant';

@ObjectType()
export class User extends BaseModel {

  @Field(_type => String, { nullable: true })
  @Matches(/^[0-9a-fA-F]{24}$/)
  @IsString()
  @IsOptional()
  _id?: string;

  @Field(_type => String, { nullable: true })
  @Matches(/^[A-Za-z_]\w{5,15}$/)
  @IsString()
  @IsOptional()
  username?: string;

  @Matches(/[a-fA-F0-9]{32}/)
  @IsString()
  @IsOptional()
  password?: string;

  @Field(_type => String, { nullable: true })
  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string;

  @Field(_type => String, { nullable: true })
  @IsPhoneNumber("US")
  @IsString()
  @IsOptional()
  telephone?: string;

  @Field(_type => String, { nullable: true })
  @IsString()
  @IsOptional()
  firstName?: string;

  @Field(_type => String, { nullable: true })
  @IsString()
  @IsOptional()
  lastName?: string;

  @Field(_type => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  emailVerified?: boolean;

  @Field(_type => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  telephoneVerified?: boolean;

  @Field(_type => Int, { nullable: true })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @Field(_type => String, { nullable: true })
  @IsUrl()
  @IsOptional()
  avatarURI?: string;

  @Field(_type => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  createdTime?: Date;

  @Field(_type => String, { nullable: true })
  @IsIP()
  @IsOptional()
  lastLoginIP?: string;

  @Field(_type => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  lastLoginTime?: Date;

  @Field(_type => Int, { nullable: true })
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;

  @Field(_type => [Post], { nullable: true })
  posts?: Post[];


}
