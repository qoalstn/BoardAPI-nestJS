import { Controller, Get, UseGuards, Body, Post, Request, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginCredential } from './dto/login-credential.dto'
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  async login(@Body() body : LoginCredential, @Req() req) : Promise<any> {
    const user = await this.authService.login(body);
    return user;
    
  }

}