import * as MyModels from 'State/types';
import { ALERT_SUCCESS, ALERT_ERROR, ALERT_CLEAR } from './alert-action-constants';

export const alertSuccess = (message: string): MyModels.IAction<string> => ({
  type: ALERT_SUCCESS,
  payload: message,
});

export const alertError = (message: string): MyModels.IAction<string> => ({
  type: ALERT_ERROR,
  payload: message,
});

export const alertClear = (): MyModels.IAction<undefined> => ({
  type: ALERT_CLEAR,
  payload: undefined,
});
