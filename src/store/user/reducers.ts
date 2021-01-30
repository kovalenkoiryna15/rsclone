import * as MyModels from 'Store/types';
import * as Types from 'Entities/types';
import IUser from 'Entities/user-entities';
import { IUserState } from 'Store/user/action-types';
import { ALERT_SUCCESS, ALERT_ERROR } from './alert-action-constants';
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  SET_USER_ID,
} from './action-constants';

const initialState: IUserState = {
  user: {
    id: '',
    email: '',
    password: '',
  },
  loggingIn: false,
  alertMessage: undefined,
  errorMessage: undefined,
};

const handlers: MyModels.IHandlers<IUserState, any> = {
  [ALERT_SUCCESS]: (state, { payload: message }: MyModels.IAction<string>) => ({
    ...state,
    alertMessage: message,
  }),
  [ALERT_ERROR]: (state, { payload: message }: MyModels.IAction<string>) => ({
    ...state,
    alertMessage: message,
  }),
  [SET_USER_ID]: (state, { payload: id }: MyModels.IAction<Types.ID>) => {
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
  [REGISTER_REQUEST]: (state, { payload: user }: MyModels.IAction<IUser>) => ({
    ...state,
    user,
    loggingIn: false,
  }),
  [REGISTER_SUCCESS]: (state) => ({
    ...state,
    loggingIn: true,
  }),
  [LOGIN_REQUEST]: (state, { payload: user }: MyModels.IAction<IUser>) => ({
    ...state,
    user,
    loggingIn: false,
  }),
  [LOGIN_SUCCESS]: (state, { payload: user }: MyModels.IAction<IUser>) => ({
    ...state,
    user,
    loggingIn: true,
  }),
  DEFAULT: (state) => state,
};

const userReducer: MyModels.Reducer<IUserState, any> = (
  state = initialState, action,
) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default userReducer;
