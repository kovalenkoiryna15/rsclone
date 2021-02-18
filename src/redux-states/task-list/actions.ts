import ITask from 'Entities/task-entities';
import * as StateTypes from 'States/types';
import { DESELECT_TASK, HIDE_EDIT, SELECT_TASK, SHOW_EDIT } from './action-constants';

export const deselectTask = (): StateTypes.IAction<undefined> => ({
  type: DESELECT_TASK,
  payload: undefined,
});

export const hideEdit = (): StateTypes.IAction<undefined> => ({
  type: HIDE_EDIT,
  payload: undefined,
});

export const selectTask = (task: ITask): StateTypes.IAction<ITask> => ({
  type: SELECT_TASK,
  payload: task,
});

export const showEdit = (): StateTypes.IAction<undefined> => ({
  type: SHOW_EDIT,
  payload: undefined,
});
