import * as MyModels from 'Store/types';
import { IUser } from 'Entities/user-entities';
import { IUserState } from 'Store/user/types';
import { ALERT_SUCCESS, ALERT_ERROR } from './alert-action-constants';
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
} from './action-constants';

export const initialUserState: IUserState = {
  user: {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    token: '',
  },
  loggingIn: false,
  alertMessage: null,
  errorMessage: null,
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
  [REGISTER_SUCCESS]: (state, action: MyModels.IAction<IUser>) => ({
    ...state,
    user: action.payload,
    loggingIn: true,
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
