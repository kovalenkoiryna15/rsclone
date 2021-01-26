export interface IUser {
  id: ID;
  email: string;
  password: string;
}

export type ID = string | number;
