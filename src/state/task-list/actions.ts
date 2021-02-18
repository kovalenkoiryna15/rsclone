import ITask from 'Entities/task-entities';
import * as MyModels from 'State/types';
import { DESELECT_TASK, HIDE_EDIT, SELECT_TASK, SHOW_EDIT } from './action-constants';

export const deselectTask = (): MyModels.IAction<undefined> => ({
  type: DESELECT_TASK,
  payload: undefined,
});

export const hideEdit = (): MyModels.IAction<undefined> => ({
  type: HIDE_EDIT,
  payload: undefined,
});

export const selectTask = (task: ITask): MyModels.IAction<ITask> => ({
  type: SELECT_TASK,
  payload: task,
});

export const showEdit = (): MyModels.IAction<undefined> => ({
  type: SHOW_EDIT,
  payload: undefined,
});
