import * as MyModels from 'Store/types';
import IRSCloneTrackingTime from 'Entities/rsclone-tracking-time';
import { IUser } from 'entities/user-entities';
import auth from './src/firebase';
import { TUserLogin, IUserState } from './types';
import { loginLocal, registerLocal } from '../../services/localStorage-helpers';

import { alertSuccess, alertError } from './alert-action-creators';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './action-constants';

export const loginRequest = (user: TUserLogin): MyModels.IAction<TUserLogin> => ({
  type: LOGIN_REQUEST,
  payload: user,
});

export const loginSuccess = (user: IUser): MyModels.IAction<IUser> => ({
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
  try {
    const response: Response = await loginLocal(userData) as Response;
    const { user } = await response.json() as IRSCloneTrackingTime;
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
    dispatch(alertError(error.toString()));
  }
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
  newUser: IUser,
): MyModels.AsyncDispatch<IUserState, any> => async (dispatch) => {
  dispatch(registerRequest(newUser));
  // try {
  //   const response: Response = await registerLocal(newUser) as Response;
  //   const { user } = await response.json() as IRSCloneTrackingTime;
  //   dispatch(registerSuccess(user));
  //   dispatch(alertSuccess('Registration successful'));
  // } catch (error) {
  //   dispatch(registerFailure(error.message));
  //   dispatch(alertError(error.toString()));
  // }

  try {
    const { email, password } = newUser;
    await auth.createUserWithEmailAndPassword(email, password);
    auth.onAuthStateChanged((user) => {
      dispatch(registerSuccess(user));
      dispatch(alertSuccess('Registration successful'));
    });
  } catch (error) {
    dispatch(registerFailure(error.message));
    dispatch(alertError(error.toString()));
  }
};

export const logout = (
): MyModels.IAction<undefined> => ({
  type: LOGOUT,
  payload: undefined,
});
