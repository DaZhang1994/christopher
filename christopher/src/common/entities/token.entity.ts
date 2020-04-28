import { IsEnum, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { UserRole } from '../../user/constants/role.constant';

export class Token {

  @IsString()
  @IsNotEmpty()
  username: string;

  @Matches(/^[0-9a-fA-F]{24}$/)
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @IsNumber()
  @IsNotEmpty()
  iat: number;

  @IsNumber()
  @IsNotEmpty()
  exp: number;

}
