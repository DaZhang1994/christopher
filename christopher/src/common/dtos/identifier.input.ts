import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';

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

  get currIdentifier(): string {
    return this._id || this.username || this.email || this.telephone;
  }
}
