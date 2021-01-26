import * as MyModels from 'Store/types';
// import IRSCloneTrackingTime from 'Entities/rsclone-tracking-time';
import { IUser, ID } from 'entities/user-entities';
import auth from './src/firebase';
import { IUserState } from './types';
// import { loginLocal, registerLocal } from '../../services/localStorage-helpers';

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

export const setUserID = (id: ID): MyModels.IAction<ID> => ({
  type: LOGIN_REQUEST,
  payload: id,
});

export const loginRequest = (user: IUser): MyModels.IAction<IUser> => ({
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
  userData: IUser,
): MyModels.AsyncDispatch<IUserState, any> => async (dispatch) => {
  dispatch(loginRequest(userData));
  // try {
  //   const response: Response = await loginLocal(userData) as Response;
  //   const { user } = await response.json() as IRSCloneTrackingTime;
  //   dispatch(loginSuccess(user));
  // } catch (error) {
  //   dispatch(loginFailure(error.message));
  //   dispatch(alertError(error.toString()));
  // }
  try {
    const { email, password } = userData;
    await auth.signInWithEmailAndPassword(email, password);
    dispatch(loginSuccess(userData));
    dispatch(setUserID(String(auth.currentUser.uid)));
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
      dispatch(setUserID(String(auth.currentUser.uid)));
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
