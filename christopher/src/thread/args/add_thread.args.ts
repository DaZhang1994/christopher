import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class AddThreadArgs {

  @Field(_type => String)
  subject: string;

}
