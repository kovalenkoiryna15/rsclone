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

export const initialUserState: IUserState = {
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
  [ALERT_SUCCESS]: (state, action: MyModels.IAction<string>) => ({
    ...state,
    alertMessage: action.payload,
  }),
  [ALERT_ERROR]: (state, action: MyModels.IAction<string>) => ({
    ...state,
    alertMessage: action.payload,
  }),
  [SET_USER_ID]: (state, { payload: id }: MyModels.IAction<Types.ID>) => {
    const { user } = state;
    const newUser = {
      ...user,
      id,
    };
    return {
      ...state,
      user: newUser,
    };
  },
  [REGISTER_REQUEST]: (state, action: MyModels.IAction<IUser>) => ({
    ...state,
    user: action.payload,
    loggingIn: false,
  }),
  [REGISTER_SUCCESS]: (state) => ({
    ...state,
    loggingIn: true,
  }),
  [LOGIN_REQUEST]: (state, action: MyModels.IAction<IUser>) => ({
    ...state,
    user: action.payload,
    loggingIn: false,
  }),
  [LOGIN_SUCCESS]: (state, action: MyModels.IAction<IUser>) => ({
    ...state,
    user: action.payload,
    loggingIn: true,
  }),
  DEFAULT: (state) => state,
};

const userReducer: MyModels.Reducer<IUserState, any> = (
  state = initialUserState, action,
) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default userReducer;
