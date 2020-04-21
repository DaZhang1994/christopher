import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class Token {

  @IsString()
  @IsNotEmpty()
  username: string;

  @Matches(/^[0-9a-fA-F]{24}$/)
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsNumber()
  @IsNotEmpty()
  iat: number;

  @IsNumber()
  @IsNotEmpty()
  exp: number;

}
