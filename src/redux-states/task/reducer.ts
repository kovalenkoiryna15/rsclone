import ITask from 'Entities/task';
import * as AppTypes from 'Entities/types';
import * as StateTypes from 'States/types';
import * as t from './action-types';
import { TaskState } from './model';

const initialState: TaskState = {
  tasks: [],
  newTaskTitle: '',
  error: undefined,
};

const handlers: StateTypes.IHandlers<TaskState, any> = {
  [t.ADD]: (state, { payload: task }: StateTypes.IAction<ITask>) => ({
    ...state,
    tasks: [...state.tasks, task],
  }),
  [t.UPDATE]: (state, { payload: newTask }: StateTypes.IAction<ITask>) => {
    const tasks = [...state.tasks];
    tasks.splice(
      state.tasks.findIndex((task) => task.id === newTask.id),
      1,
      newTask
    );
    return {
      ...state,
      tasks,
    };
  },
  [t.FETCH_TASKS]: (state, { payload: tasks }: StateTypes.IAction<Array<ITask>>) => ({
    ...state,
    tasks,
  }),
  [t.REMOVE]: (state, { payload: id }: StateTypes.IAction<AppTypes.ID>) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== id),
  }),
  [t.FETCH_TASKS_FAILURE]: (
    state,
    { payload: error }: StateTypes.IAction<typeof Error>
  ) => ({
    ...state,
    error,
  }),
  [t.ADD_FAILURE]: (state, { payload: error }: StateTypes.IAction<typeof Error>) => ({
    ...state,
    error,
  }),
  [t.UPDATE_FAILURE]: (state, { payload: error }: StateTypes.IAction<typeof Error>) => ({
    ...state,
    error,
  }),
  [t.REMOVE_FAILURE]: (state, { payload: error }: StateTypes.IAction<typeof Error>) => ({
    ...state,
    error,
  }),
  DEFAULT: (state) => state,
};

const taskReducer: StateTypes.Reducer<TaskState, any> = (
  state = initialState,
  action
) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default taskReducer;
