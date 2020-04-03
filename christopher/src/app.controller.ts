import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsernameGuard } from './auth/guards/username.guard';

@Controller()
export class AppController {
  constructor() {}

  @Post('login/username')
  @UseGuards(UsernameGuard)
  async authUsername(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwtLogin'))
  @Post('login/auth')
  async authCredentials(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
