import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { UsernameGuard } from './auth/guards/username.guard';
import { LoginGuard } from './auth/guards/login.guard';
import { AuthGuard } from './auth/guards/auth.guard';

@Controller()
export class AppController {
  constructor() {}

  @Post('login/username')
  @UseGuards(UsernameGuard)
  async authUsername(@Request() req) {
    return req.token;
  }

  @Post('login/auth')
  @UseGuards(LoginGuard)
  async authCredentials(@Request() req) {
    return req.token;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.token;
  }

}
