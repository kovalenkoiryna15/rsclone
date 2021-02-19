import { IFirebaseState } from 'States/firebase/model';
import * as StateTypes from 'States/types';
import { HIDE_LOADER, SHOW_LOADER } from './action-types';

const initialState: IFirebaseState = {
  isLoading: true,
};

const handlers: StateTypes.IHandlers<IFirebaseState, undefined> = {
  [HIDE_LOADER]: (state) => ({
    ...state,
    isLoading: false,
  }),
  [SHOW_LOADER]: (state) => ({
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
