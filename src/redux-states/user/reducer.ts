import * as AppTypes from 'Entities/types';
import IUser from 'Entities/user';
import * as StateTypes from 'States/types';
import * as t from './action-types';
import { ALERT_CLEAR, ALERT_ERROR, ALERT_SUCCESS } from './alert-action-types';
import { IUserState } from './model';

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
  [t.SET_USER_ID]: (state, { payload: id }: StateTypes.IAction<AppTypes.ID>) => {
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
  [t.REGISTER_REQUEST]: (state, { payload: user }: StateTypes.IAction<IUser>) => ({
    ...state,
    user,
    isAuthorized: false,
  }),
  [t.REGISTER_SUCCESS]: (state) => ({
    ...state,
    isAuthorized: true,
  }),
  [t.LOGIN_REQUEST]: (state, { payload: user }: StateTypes.IAction<IUser>) => ({
    ...state,
    user,
    isAuthorized: false,
  }),
  [t.LOGIN_SUCCESS]: (state, { payload: user }: StateTypes.IAction<IUser>) => ({
    ...state,
    user,
    isAuthorized: true,
  }),
  [t.LOGOUT]: (state) => ({
    ...state,
    isAuthorized: false,
    alertMessage: undefined,
  }),
  DEFAULT: (state) => state,
};

const userReducer: StateTypes.Reducer<IUserState, any> = (
  state = initialState,
  action
) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default userReducer;
