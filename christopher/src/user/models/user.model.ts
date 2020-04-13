import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class User extends BaseModel {

  @Field({ nullable: true })
  username?: string;

  @IsEmail()
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  telephone?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  middleName?: string;

  @Field({ nullable: true })
  lastName?: string;
}
