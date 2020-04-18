import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Token {

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNumber()
  @IsNotEmpty()
  iat: number;

  @IsNumber()
  @IsNotEmpty()
  exp: number;

}
