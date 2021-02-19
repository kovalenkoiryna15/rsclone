import ITask from 'Entities/task';
import * as StateTypes from 'States/types';
import * as t from './action-types';
import { TaskListState } from './model';

const initialState: TaskListState = {
  isVisibleEdit: false,
  selectedTask: undefined,
  error: undefined,
};

const handlers: StateTypes.IHandlers<TaskListState, any> = {
  [t.HIDE_EDIT]: (state) => ({
    ...state,
    isVisibleEdit: false,
  }),
  [t.SHOW_EDIT]: (state) => ({
    ...state,
    isVisibleEdit: true,
  }),
  [t.SELECT_TASK]: (state, { payload: selectedTask }: StateTypes.IAction<ITask>) => ({
    ...state,
    selectedTask,
  }),
  [t.DESELECT_TASK]: (state) => ({
    ...state,
    selectedTask: undefined,
  }),
  DEFAULT: (state) => state,
};

const taskListReducer: StateTypes.Reducer<TaskListState, any> = (
  state = initialState,
  action
) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default taskListReducer;
