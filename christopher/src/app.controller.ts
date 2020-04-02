import { Controller, Get, Request, Post, UseGuards, Body, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsernameValidator } from './auth/validators/username.validator';
import { AuthValidator } from './auth/validators/auth.validator';

@Controller()
export class AppController {
  constructor() {}

  @UseGuards(AuthGuard('local'))
  @Post('login/username')
  @UsePipes(UsernameValidator)
  async authUsername(@Request() req, @Body() body) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwtLogin'))
  @Post('login/auth')
  @UsePipes(AuthValidator)
  async authCredentials(@Request() req, @Body() body) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
