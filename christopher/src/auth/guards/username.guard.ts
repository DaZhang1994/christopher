import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsernameDto } from '../dtos/username.dto';
import { validate } from 'class-validator';



@Injectable()
export class UsernameGuard implements CanActivate {

  constructor(private readonly authService: AuthService) {

  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const req = context.switchToHttp().getRequest();
    const body = req.body;

    const err = await validate(new UsernameDto(body.username));
    if(err.length > 0) {
      throw new BadRequestException('Invalid username!');
    }

    const user = await this.authService.validateUsername(body.username);
    if (!user) {
      throw new UnauthorizedException('Unauthorized username!');
    }

    req.token = await this.authService.assignTempToken(user);
    return true;

  }

}
