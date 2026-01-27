import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from '@nestjs/common';
import { GoogleAuthGuard } from './passport/google-oauth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get()
  @UseGuards(GoogleAuthGuard)
  googleAuth(@Request() req) {
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Request() req) {
    console.log(req.user);
    
    return this.authService.googleLogin(req.user);
  }
}
