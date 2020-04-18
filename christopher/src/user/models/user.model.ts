import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsIP,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';
import { BaseModel } from '../../common/models/base.model';
import { Thread } from '../../thread/models/thread.model';

@ObjectType()
export class User extends BaseModel {

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
  @IsInt()
  @IsOptional()
  role?: number;

  @Field(_type => String, { nullable: true })
  @IsUrl()
  @IsOptional()
  avatarURI?: string;

  @Field({ nullable: true })
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
  @IsInt()
  @IsOptional()
  status?: number;

  @Field(_type => [Thread], { nullable: true})
  threads?: (string | Thread)[];

}
