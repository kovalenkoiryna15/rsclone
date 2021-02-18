import ITask from 'Entities/task-entities';
import * as AppTypes from 'Entities/types';
import * as StateTypes from 'States/types';
import {
  ADD,
  ADD_FAILURE,
  FETCH_TASKS,
  FETCH_TASKS_FAILURE,
  REMOVE,
  REMOVE_FAILURE,
  UPDATE,
  UPDATE_FAILURE,
} from './action-constants';
import { TasksState } from './action-types';

const initialState: TasksState = {
  tasks: [],
  newTaskTitle: '',
  error: undefined,
};

const handlers: StateTypes.IHandlers<TasksState, any> = {
  [ADD]: (state, { payload: task }: StateTypes.IAction<ITask>) => ({
    ...state,
    tasks: [...state.tasks, task],
  }),
  [UPDATE]: (state, { payload: task }: StateTypes.IAction<ITask>) => {
    const tasks = [...state.tasks];
    tasks.splice(
      state.tasks.findIndex((t) => t.id === task.id),
      1,
      task
    );
    return {
      ...state,
      tasks,
    };
  },
  [FETCH_TASKS]: (state, { payload: tasks }: StateTypes.IAction<Array<ITask>>) => ({
    ...state,
    tasks,
  }),
  [REMOVE]: (state, { payload: id }: StateTypes.IAction<AppTypes.ID>) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== id),
  }),
  [FETCH_TASKS_FAILURE]: (
    state,
    { payload: error }: StateTypes.IAction<typeof Error>
  ) => ({
    ...state,
    error,
  }),
  [ADD_FAILURE]: (state, { payload: error }: StateTypes.IAction<typeof Error>) => ({
    ...state,
    error,
  }),
  [UPDATE_FAILURE]: (state, { payload: error }: StateTypes.IAction<typeof Error>) => ({
    ...state,
    error,
  }),
  [REMOVE_FAILURE]: (state, { payload: error }: StateTypes.IAction<typeof Error>) => ({
    ...state,
    error,
  }),
  DEFAULT: (state) => state,
};

const taskReducer: StateTypes.Reducer<TasksState, any> = (
  state = initialState,
  action
) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default taskReducer;
