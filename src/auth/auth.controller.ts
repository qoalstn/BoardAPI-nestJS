import { Controller, Get, UseGuards, Body, Post, Request, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginCredential } from './dto/login-credential.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



  @Post('login')
  async login(@Body() body : any) : Promise<any> {
    const user = await this.authService.validateUser(body);
    return this.authService.login(user);
    
  }


  // @Post('login')
  // async login(@Body() body : any) : Promise<any> {
  //   const user = await this.authService.login(body);
  //   return user;
    
  // }

}