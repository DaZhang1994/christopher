export interface Token {
  username?: string;
  loggedIn?: boolean;
  salt?: string;
  saltExp?: number;
}
