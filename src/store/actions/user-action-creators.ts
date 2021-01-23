import * as MyModels from 'Store/types';
import { IUser } from 'entities/user-entities';
import { TUserLogin, IUserState } from './user-types';
import { alertSuccess, alertError } from './alert-action-creators';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './user-action-constants';

export const loginRequest = (user: TUserLogin): MyModels.IAction<TUserLogin> => ({
  type: LOGIN_REQUEST,
  payload: user,
});

export const loginSuccess = (user: TUserLogin): MyModels.IAction<TUserLogin> => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (errorMessage: string): MyModels.IAction<string> => ({
  type: LOGIN_FAILURE,
  payload: errorMessage,
});

export const login = (
  userData: TUserLogin,
): MyModels.AsyncDispatch<IUserState, any> => async (dispatch) => {
  dispatch(loginRequest(userData));
  userService.login(username, password)
    .then(
      (user): TUserLogin => {
        dispatch(loginSuccess(user));
      },
      (error): Error => {
        dispatch(loginFailure(error.message));
        dispatch(alertError(error.toString()));
      },
    );
};

export const registerRequest = (user: IUser): MyModels.IAction<IUser> => ({
  type: REGISTER_REQUEST,
  payload: user,
});

export const registerSuccess = (user: IUser): MyModels.IAction<IUser> => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (errorMessage: string): MyModels.IAction<string> => ({
  type: REGISTER_FAILURE,
  payload: errorMessage,
});

export const register = (
  user: IUser,
): MyModels.AsyncDispatch<IUserState, any> => async (dispatch) => {
  dispatch(registerRequest(userData));
  userService.register(user)
    .then(
      (user): IUser => {
        dispatch(registerSuccess(user));
        dispatch(alertSuccess('Registration successful'));
      },
      (error): Error => {
        dispatch(registerFailure(error.message));
        dispatch(alertError(error.toString()));
      },
    );
};

export const logout = (
): MyModels.AsyncDispatch<IUserState, any> => {
  userService.logout();
  return { type: LOGOUT };
};
