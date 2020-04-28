import { AuthService } from '../services/auth.service';
import { AuthArgs } from '../dtos/auth.args';
import { IdentifierInput } from '../../common/dtos/identifier.input';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver(_of => String)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {

  }

  @Query(_returns => String)
  async token(@Args() authArgs: AuthArgs) {
    return await this.authService.assignToken(authArgs);
  }

  @Query(_returns => String)
  async loginToken(@Args('identifier') identifier: IdentifierInput) {
    return await this.authService.assignLoginToken(identifier);
  }

}
