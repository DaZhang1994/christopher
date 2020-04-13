import { IsEmail, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class IdentifierInput {

  @Field({ nullable: true })
  _id?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  telephone?: string;

  get identifier() {
    return this._id || this.username || this.email || this.telephone;
  }
}
