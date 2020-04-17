import { IdentifierInput } from '../../common/dtos/identifier.input';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@ArgsType()
export class AuthArgs {

  @Field(_type => IdentifierInput)
  @ValidateNested()
  @IsNotEmpty()
  @Type(_type => IdentifierInput)
  identifier: IdentifierInput;

  @Field()
  @IsNotEmpty()
  password: string;
}
