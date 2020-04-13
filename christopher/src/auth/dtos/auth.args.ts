import { IdentifierInput } from '../../user/dtos/identifier.input';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class AuthArgs {
  @Field(_type => IdentifierInput)
  identifier: IdentifierInput;

  @Field()
  password: string;
}
