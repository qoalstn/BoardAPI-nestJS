import { Controller, Get, UseGuards, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginCredential } from './dto/login-credential.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  async createToken(@Body() body : LoginCredential): Promise<any> {
    return await this.authService.createToken(body);
  }

  @Get('data')
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    // this route is restricted
  }



}