import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';
import { User } from '../../user/models/user.model';

@ObjectType()
export class Thread extends BaseModel {

  _id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field(_type => [User], { nullable: true })
  users?: User[];

  userIds?: string[];
}
