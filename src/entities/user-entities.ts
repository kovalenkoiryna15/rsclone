export interface IUser {
  id: ID;
  username: string;
  firstName: string;
  lastName: string;
  token?: Token;
  password: Token;
}

type ID = string | number;
type Token = string | number;
