import * as AppTypes from 'Entities/types';
import IUser from 'Entities/user';
import * as StateTypes from 'States/types';
import { auth } from 'Utils/firebase';
import * as t from './action-types';
import { alertError, alertSuccess } from './alert-action-creators';
import { IUserState } from './model';

function isError(error: Error | unknown): error is Error {
  return (error as Error).message !== undefined;
}

export const setUserID = (id: AppTypes.ID): StateTypes.IAction<AppTypes.ID> => ({
  type: t.SET_USER_ID,
  payload: id,
});

export const loginRequest = (user: IUser): StateTypes.IAction<IUser> => ({
  type: t.LOGIN_REQUEST,
  payload: user,
});

export const loginSuccess = (user: IUser): StateTypes.IAction<IUser> => ({
  type: t.LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (errorMessage: string): StateTypes.IAction<string> => ({
  type: t.LOGIN_FAILURE,
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
  type: t.REGISTER_REQUEST,
  payload: user,
});

export const registerSuccess = (): StateTypes.IAction<undefined> => ({
  type: t.REGISTER_SUCCESS,
  payload: undefined,
});

export const registerFailure = (errorMessage: string): StateTypes.IAction<string> => ({
  type: t.REGISTER_FAILURE,
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
  type: t.LOGOUT,
  payload: undefined,
});
