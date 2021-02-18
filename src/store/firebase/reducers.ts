import { IFirebaseState } from 'Store/firebase/action-types';
import * as MyModels from 'Store/types';
import { HIDE_LOADER, SHOW_LOADER } from './action-constants';

const initialState: IFirebaseState = {
  isLoading: true,
};

const handlers: MyModels.IHandlers<IFirebaseState, undefined> = {
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

const firebaseReducer: MyModels.Reducer<IFirebaseState, undefined> = (
  state = initialState,
  action
) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default firebaseReducer;
