import IUser from 'Entities/user';

export interface IUserState {
  user: IUser;
  isAuthorized: boolean;
  alertMessage?: string;
  errorMessage?: string;
}
