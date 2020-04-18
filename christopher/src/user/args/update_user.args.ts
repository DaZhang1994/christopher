import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';

@ArgsType()
export class UpdateUserArgs {

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  telephone?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;
}
