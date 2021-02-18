import * as AppTypes from 'Entities/types';
import * as StateTypes from 'States/types';
import IUser from 'Entities/user-entities';
import { auth } from 'Utils/firebase';
import { IUserState } from './action-types';
import { alertSuccess, alertError } from './alert-action-creators';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SET_USER_ID,
} from './action-constants';

function isError(error: Error | unknown): error is Error {
  return (error as Error).message !== undefined;
}

export const setUserID = (id: AppTypes.ID): StateTypes.IAction<AppTypes.ID> => ({
  type: SET_USER_ID,
  payload: id,
});

export const loginRequest = (user: IUser): StateTypes.IAction<IUser> => ({
  type: LOGIN_REQUEST,
  payload: user,
});

export const loginSuccess = (user: IUser): StateTypes.IAction<IUser> => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (errorMessage: string): StateTypes.IAction<string> => ({
  type: LOGIN_FAILURE,
  payload: errorMessage,
});

export const login = (
  userData: IUser
): StateTypes.AsyncDispatch<IUserState, any> => async (dispatch) => {
  dispatch(loginRequest(userData));
  try {
    const { email, password } = userData;
    await auth.signInWithEmailAndPassword(email, password);
    dispatch(loginSuccess(userData));
    if (auth.currentUser) {
      dispatch(setUserID(String(auth.currentUser.uid)));
    }
  } catch (error) {
    if (isError(error)) {
      dispatch(loginFailure(error.message));
      dispatch(alertError(error.message));
    }
  }
};

export const registerRequest = (user: IUser): StateTypes.IAction<IUser> => ({
  type: REGISTER_REQUEST,
  payload: user,
});

export const registerSuccess = (): StateTypes.IAction<undefined> => ({
  type: REGISTER_SUCCESS,
  payload: undefined,
});

export const registerFailure = (errorMessage: string): StateTypes.IAction<string> => ({
  type: REGISTER_FAILURE,
  payload: errorMessage,
});

export const register = (
  newUser: IUser
): StateTypes.AsyncDispatch<IUserState, any> => async (dispatch) => {
  dispatch(registerRequest(newUser));
  try {
    const { email, password } = newUser;
    await auth.createUserWithEmailAndPassword(email, password);
    auth.onAuthStateChanged((/* user */) => {
      dispatch(registerSuccess());
      dispatch(alertSuccess('Registration successful'));
      if (auth.currentUser) {
        dispatch(setUserID(String(auth.currentUser.uid)));
      }
    });
  } catch (error) {
    if (isError(error)) {
      dispatch(registerFailure(error.message));
      dispatch(alertError(error.message));
    }
  }
};

export const logout = (): StateTypes.IAction<undefined> => ({
  type: LOGOUT,
  payload: undefined,
});
