import * as AppTypes from './types';

export default interface IUser {
  id: AppTypes.ID;
  email: string;
  password: string;
}
