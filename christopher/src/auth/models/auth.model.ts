import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class Auth extends BaseModel{
  @Field()
  isAuthenticated?: boolean;
}
