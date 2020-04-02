import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor() {}

  @UseGuards(AuthGuard('local'))
  @Post('login/username')
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
