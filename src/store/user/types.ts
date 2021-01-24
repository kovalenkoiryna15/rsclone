import { IUser } from 'entities/user-entities';

export interface IUserState {
  user: IUser;
  loggingIn: boolean;
  alertMessage?: string | null;
  errorMessage?: string | null;
}

export interface TUserLogin {
  username: string;
  password: string | number;
}