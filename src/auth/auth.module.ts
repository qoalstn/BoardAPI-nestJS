import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}




// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { UserModule } from '../user/user.module';
// import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './strategies/local.strategy';

// @Module({
//   imports: [UserModule, PassportModule],
//   providers: [AuthService, LocalStrategy],
// })
// export class AuthModule {}
