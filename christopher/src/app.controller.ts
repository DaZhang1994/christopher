import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { LoginGuard } from './auth/login.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login/username')
  async authUsername(@Request() req) {
    return this.authService.assignTempToken(req.user);
  }

  @UseGuards(LoginGuard)
  @UseGuards(AuthGuard('jwtLogin'))
  @Post('login/auth')
  async authCredentials(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
