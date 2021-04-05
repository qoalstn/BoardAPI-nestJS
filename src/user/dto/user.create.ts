import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateUser {
  @IsString() 
  @IsNotEmpty() 
  readonly user_id : string; 

  @IsString()
  @IsNotEmpty()
  readonly user_pw : string;

  @IsString()
  @IsNotEmpty()
  readonly user_email : string;

  @IsDate()
  readonly user_regdate : Date;
}

