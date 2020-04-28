import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRole } from '../../user/constants/role.constant';

@Injectable()
export class RoleInterceptor implements NestInterceptor {

  constructor(private readonly reflector: Reflector) {

  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {

    const permittedRole: UserRole = this.reflector.get('Role', context.getHandler());
    if(permittedRole == null) {
      return next.handle();
    }

    const req: any = GqlExecutionContext.create(context).getContext().req;

    if(req.token == null) {
      throw new UnauthorizedException('No validated token in request param! Please include @Token() before @Admin()!')
    }

    if(req.token.role > permittedRole) {
      throw new UnauthorizedException('Permission denied!')
    }

    return next.handle();
  }
}
