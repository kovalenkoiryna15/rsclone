import * as Types from 'Entities/types';
import * as MyModels from 'Store/types';
import ITask from 'Entities/task-entities';
import {
  ADD, TOGGLE_COMPLETE_TASK, FETCH_TASKS, REMOVE_TASK, FETCH_TASKS_FAILURE, PUSH_TASK_FAILURE,
  UPDATE_FAILURE,
} from './action-constants';
import { TasksState } from './action-types';

const initialState: TasksState = {
  tasks: [],
  newTaskTitle: '',
  error: undefined,
};

const handlers: MyModels.IHandlers<TasksState, any> = {
  [ADD]: (state, { payload: task }: MyModels.IAction<ITask>) => ({
    ...state,
    tasks: [...state.tasks, task],
  }),
  [UPDATE]: (state, { payload: task }: MyModels.IAction<ITask>) => ({
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
  [FETCH_TASKS_FAILURE]: (state, { payload: error }: MyModels.IAction<typeof Error>) => ({
    ...state,
    error,
  }),
  [PUSH_TASK_FAILURE]: (state, { payload: error }: MyModels.IAction<typeof Error>) => ({
    ...state,
    error,
  }),
  [UPDATE_FAILURE]: (state, { payload: error }: MyModels.IAction<typeof Error>) => ({
    ...state,
    error,
  }),
  DEFAULT: (state) => state,
};

const tasksReducer: MyModels.Reducer<TasksState, any> = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default tasksReducer;
