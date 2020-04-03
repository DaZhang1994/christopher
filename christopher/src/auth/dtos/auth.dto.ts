import { IsNotEmpty, Matches } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @Matches(/^[A-Za-z_]\w{5,15}$/)
  username: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z0-9\S]{8,16}$/)
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
