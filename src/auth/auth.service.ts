import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  // getHello(): string {
  //   return 'Hello World!';
  // }


  async createToken(body) {
    const user: JwtPayload = { user_id: body.user_id, user_pw: body.user_pw };
    const accessToken = this.jwtService.sign(user);
    console.log(accessToken);
    return {
      expiresIn: 3600000,
      accessToken,
    };
  }


  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.user_pw === pass) {
      const { user_pw, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.user_id, sub: user.user_pw };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
