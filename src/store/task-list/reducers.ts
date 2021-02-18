import ITask from 'Entities/task-entities';
import * as MyModels from 'Store/types';
import { DESELECT_TASK, HIDE_EDIT, SELECT_TASK, SHOW_EDIT } from './action-constants';
import { TaskListState } from './action-types';

const initialState: TaskListState = {
  isVisibleEdit: false,
  selectedTask: undefined,
  error: undefined,
};

const handlers: MyModels.IHandlers<TaskListState, any> = {
  [HIDE_EDIT]: (state) => ({
    ...state,
    isVisibleEdit: false,
  }),
  [SHOW_EDIT]: (state) => ({
    ...state,
    isVisibleEdit: true,
  }),
  [SELECT_TASK]: (state, { payload: selectedTask }: MyModels.IAction<ITask>) => ({
    ...state,
    selectedTask,
  }),
  [DESELECT_TASK]: (state) => ({
    ...state,
    selectedTask: undefined,
  }),
  DEFAULT: (state) => state,
};

const taskListReducer: MyModels.Reducer<TaskListState, any> = (
  state = initialState,
  action
) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default taskListReducer;
