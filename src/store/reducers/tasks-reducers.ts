import { ITask } from 'Entities/task-entities';
import { ADD_TASK } from 'Store/actions/task-action-constants';
import { ITaskState } from 'Store/actions/task-action-types';
import * as MyModels from 'Store/types';

const initialState: ITaskState = {
  tasks: [],
};

const handlers: MyModels.IHandlers<ITaskState, ITask> = {
  [ADD_TASK]: (state, { payload }) => ({
    ...state,
    tasks: [...state.tasks, payload],
  }),
  DEFAULT: (state) => state,
};

const tasksReducer: MyModels.Reducer<ITaskState, ITask> = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default tasksReducer;
