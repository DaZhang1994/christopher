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

  static isLoggedIn(token: Token): boolean {
    return token.loggedIn == true && token.salt == '' && token.saltExp == -1;
  }

  static tempTokenExpired(token: Token): boolean {
    return Date.now() - token.saltExp >= 0;
  }
}
