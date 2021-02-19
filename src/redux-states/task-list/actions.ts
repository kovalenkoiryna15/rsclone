import ITask from 'Entities/task';
import * as StateTypes from 'States/types';
import * as t from './action-types';

export const deselectTask = (): StateTypes.IAction<undefined> => ({
  type: t.DESELECT_TASK,
  payload: undefined,
});

export const hideEdit = (): StateTypes.IAction<undefined> => ({
  type: t.HIDE_EDIT,
  payload: undefined,
});

export const selectTask = (task: ITask): StateTypes.IAction<ITask> => ({
  type: t.SELECT_TASK,
  payload: task,
});

export const showEdit = (): StateTypes.IAction<undefined> => ({
  type: t.SHOW_EDIT,
  payload: undefined,
});
