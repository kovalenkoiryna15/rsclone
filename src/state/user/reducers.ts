import * as StateTypes from 'State/types';
import * as Types from 'Entities/types';
import IUser from 'Entities/user-entities';
import { IUserState } from 'State/user/action-types';
import { ALERT_SUCCESS, ALERT_ERROR, ALERT_CLEAR } from './alert-action-constants';
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  SET_USER_ID,
  LOGOUT,
} from './action-constants';

const initialState: IUserState = {
  user: {
    id: '',
    email: '',
    password: '',
  },
  isAuthorized: false,
  alertMessage: undefined,
  errorMessage: undefined,
};

const handlers: StateTypes.IHandlers<IUserState, any> = {
  [ALERT_SUCCESS]: (state, { payload: message }: StateTypes.IAction<string>) => ({
    ...state,
    alertMessage: message,
  }),
  [ALERT_ERROR]: (state, { payload: message }: StateTypes.IAction<string>) => ({
    ...state,
    alertMessage: message,
  }),
  [ALERT_CLEAR]: (state, { payload: message }: StateTypes.IAction<string>) => ({
    ...state,
    alertMessage: message,
  }),
  [SET_USER_ID]: (state, { payload: id }: StateTypes.IAction<Types.ID>) => {
    const { user } = state;
    const newUser: IUser = {
      ...user,
      id,
    };
    return {
      ...state,
      user: newUser,
    };
  },
  [REGISTER_REQUEST]: (state, { payload: user }: StateTypes.IAction<IUser>) => ({
    ...state,
    user,
    isAuthorized: false,
  }),
  [REGISTER_SUCCESS]: (state) => ({
    ...state,
    isAuthorized: true,
  }),
  [LOGIN_REQUEST]: (state, { payload: user }: StateTypes.IAction<IUser>) => ({
    ...state,
    user,
    isAuthorized: false,
  }),
  [LOGIN_SUCCESS]: (state, { payload: user }: StateTypes.IAction<IUser>) => ({
    ...state,
    user,
    isAuthorized: true,
  }),
  [LOGOUT]: (state) => ({
    ...state,
    isAuthorized: false,
    alertMessage: undefined,
  }),
  DEFAULT: (state) => state,
};

const userReducer: StateTypes.Reducer<IUserState, any> = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default userReducer;
