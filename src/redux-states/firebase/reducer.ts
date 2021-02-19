import * as StateTypes from 'States/types';
import { IFirebaseState } from './model';
import * as t from './action-types';

const initialState: IFirebaseState = {
  isLoading: true,
};

const handlers: StateTypes.IHandlers<IFirebaseState, undefined> = {
  [t.HIDE_LOADER]: (state) => ({
    ...state,
    isLoading: false,
  }),
  [t.SHOW_LOADER]: (state) => ({
    ...state,
    isLoading: true,
  }),
  DEFAULT: (state) => state,
};

const firebaseReducer: StateTypes.Reducer<IFirebaseState, undefined> = (
  state = initialState,
  action
) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default firebaseReducer;
