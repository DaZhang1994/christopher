export class Token {
  username: string;
  loggedIn: boolean;
  salt: string;
  saltExp: number;

  constructor(token: Token) {
    this.username = token.username;
    this.loggedIn = token.loggedIn;
    this.salt = token.salt;
    this.saltExp = token.saltExp;
  }
}
