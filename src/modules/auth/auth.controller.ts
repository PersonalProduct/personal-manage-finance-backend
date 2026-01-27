import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from '@nestjs/common';
import { GoogleAuthGuard } from './passport/google-oauth.guard';
import { Public } from '@/decorator/customize';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Get()
  @UseGuards(GoogleAuthGuard)
  googleAuth(@Request() req) {
  }

  @Public()
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req.user);
  }
}
