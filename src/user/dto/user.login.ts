import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  readonly user_id: string;

  @IsNotEmpty()
  readonly user_pw: string;
}