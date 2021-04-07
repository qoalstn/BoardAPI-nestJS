import {
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';


export class LoginCredential {

  @IsNotEmpty()
  readonly user_id: string;


  @MinLength(4)
  @MaxLength(12)
  readonly user_pw: string;
}
