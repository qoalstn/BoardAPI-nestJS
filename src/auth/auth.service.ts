import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }


  async login(body) {
    const user = await this.userService.findOne(body.user_id);
    const check = await bcrypt.compare(body.user_pw, user.user_pw);

    if (check) {
      const payload: JwtPayload = { id: user.mem_id, user_id: body.user_id, user_pw: body.user_pw };
      console.log(payload);

      return {
        expiresIn: 36000,
        access_token: this.jwtService.sign(payload),
      };
    } else {
      return '로그인 정보가 일치하지 않습니다.'
    }
  }




}
