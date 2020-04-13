import { AuthService } from '../services/auth.service';
import { Auth } from '../models/auth.model';
import { AuthArgs } from '../dtos/auth.args';
import { IdentifierInput } from '../../user/dtos/identifier.input';
import {  Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(_of => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {

  }

  @Query(_returns => Auth)
  async auth(@Args() authArgs: AuthArgs) {
    return await this.authService.auth(authArgs);
  }

  @Query(_returns => String)
  async loginToken(@Args('identifier') identifier: IdentifierInput) {
    return await this.authService.getLoginToken(identifier);
  }

}
