import { IsNotEmpty, Matches } from 'class-validator';

export class UsernameDto {
  @IsNotEmpty()
  @Matches(/^[A-Za-z_]\w{5,15}$/)
  username: string;

  constructor(username: string) {
    this.username = username;
  }
}
