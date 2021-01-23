import * as Types from 'Entities/types';
import * as MyModels from 'Store/types';
import ITask from 'Entities/task-entities';
import {
  ADD_TASK, TOGGLE_COMPLETE_TASK, FETCH_TASKS, REMOVE_TASK,
} from './action-constants';
import { ITaskState } from './action-types';

const initialState: ITaskState = {
  tasks: [],
  newTaskTitle: '',
};

const handlers: MyModels.IHandlers<ITaskState, any> = {
  [ADD_TASK]: (state, { payload: task }: MyModels.IAction<ITask>) => ({
    ...state,
    tasks: [...state.tasks, task],
  }),
  [FETCH_TASKS]: (state, { payload: tasks }: MyModels.IAction<Array<ITask>>) => ({
    ...state,
    tasks,
  }),
  [REMOVE_TASK]: (state, { payload: id }: MyModels.IAction<Types.ID>) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== id),
  }),
  [TOGGLE_COMPLETE_TASK]: (state, { payload: id }: MyModels.IAction<Types.ID>) => ({
    ...state,
    tasks: state.tasks.map((task) => {
      // eslint-disable-next-line no-param-reassign
      if (task.id === id) task.isCompleted = !task.isCompleted;
      return task;
    }),
  }),
  DEFAULT: (state) => state,
};

const tasksReducer: MyModels.Reducer<ITaskState, any> = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default tasksReducer;
