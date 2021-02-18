import * as StateTypes from 'State/types';
import { ALERT_SUCCESS, ALERT_ERROR, ALERT_CLEAR } from './alert-action-constants';

export const alertSuccess = (message: string): StateTypes.IAction<string> => ({
  type: ALERT_SUCCESS,
  payload: message,
});

export const alertError = (message: string): StateTypes.IAction<string> => ({
  type: ALERT_ERROR,
  payload: message,
});

export const alertClear = (): StateTypes.IAction<undefined> => ({
  type: ALERT_CLEAR,
  payload: undefined,
});
