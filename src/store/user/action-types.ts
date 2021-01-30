import IUser from 'Entities/user-entities';

export interface IUserState {
  user: IUser;
  loggingIn: boolean;
  alertMessage?: string;
  errorMessage?: string;
}
