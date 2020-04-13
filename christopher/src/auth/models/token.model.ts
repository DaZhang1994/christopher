import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class Token extends BaseModel{
  @Field()
  content: string;
}
