import ITask from 'Entities/task-entities';
import * as Types from 'Entities/types';
import * as MyModels from 'Store/types';
import {
  ADD,
  ADD_FAILURE,
  FETCH_TASKS,
  FETCH_TASKS_FAILURE,
  REMOVE,
  UPDATE,
  UPDATE_FAILURE,
} from './action-constants';
import { TasksState } from './action-types';

const initialState: TasksState = {
  tasks: [],
  newTaskTitle: '',
  error: undefined,
};

const handlers: MyModels.IHandlers<TasksState, any> = {
  [ADD]: (state, { payload: task }: MyModels.IAction<ITask>) => {
    const tasks = [...state.tasks];
    tasks.splice(
      state.tasks.findIndex((t) => t.id === task.id),
      1,
      task,
    );
    return {
      ...state,
      tasks,
    };
  },
  [UPDATE]: (state, { payload: task }: MyModels.IAction<ITask>) => {
    const tasks = [...state.tasks];
    tasks.splice(
      state.tasks.findIndex((t) => t.id === task.id),
      1,
      task,
    );
    return {
      ...state,
      tasks,
    };
  },
  [FETCH_TASKS]: (state, { payload: tasks }: MyModels.IAction<Array<ITask>>) => ({
    ...state,
    tasks,
  }),
  [REMOVE]: (state, { payload: id }: MyModels.IAction<Types.ID>) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== id),
  }),
  [FETCH_TASKS_FAILURE]: (state, { payload: error }: MyModels.IAction<typeof Error>) => ({
    ...state,
    error,
  }),
  [ADD_FAILURE]: (state, { payload: error }: MyModels.IAction<typeof Error>) => ({
    ...state,
    error,
  }),
  [UPDATE_FAILURE]: (state, { payload: error }: MyModels.IAction<typeof Error>) => ({
    ...state,
    error,
  }),
  DEFAULT: (state) => state,
};

const taskReducer: MyModels.Reducer<TasksState, any> = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default taskReducer;
