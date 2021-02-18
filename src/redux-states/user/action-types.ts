import IUser from 'Entities/user-entities';

export interface IUserState {
  user: IUser;
  isAuthorized: boolean;
  alertMessage?: string;
  errorMessage?: string;
}
