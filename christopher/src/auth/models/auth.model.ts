import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class Auth extends BaseModel{

  @Field()
  @IsNotEmpty()
  isAuthenticated: boolean;

  @Field()
  @IsNotEmpty()
  token: string;

  constructor(isAuthenticated, token) {
    super();
    this.isAuthenticated = isAuthenticated;
    this.token = token;
  }
}
