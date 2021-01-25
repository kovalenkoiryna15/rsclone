export interface IUser {
  id: ID;
  email: string;
  username: string;
  password: Token;
  token?: Token;
}

type ID = string | number;
type Token = string;
