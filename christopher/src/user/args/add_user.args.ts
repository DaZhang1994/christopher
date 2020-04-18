import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@ArgsType()
export class AddUserArgs {

  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field({ nullable: true })
  telephone?: string;

  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;
}
