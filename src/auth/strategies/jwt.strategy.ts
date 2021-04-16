import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log('jwt.strategy 로그인 정보 :', payload)
    return { id: payload.id, user_id: payload.user_id, user_pw: payload.user_pw };
  }

  // async validateUser(user_id: string, user_pw: string): Promise<any> {
  //   const user = await this.usersService.findOne(user_id);
  //   if (user && user.user_pw === user_pw) {
  //     const { user_pw, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
}
