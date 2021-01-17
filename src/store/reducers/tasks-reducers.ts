import { ADD_TASK } from '../actions/task-action-constants';
import { TTaskAction, TInitialTasksState } from '../actions/task-action-types';

export const tasksReducer = (
  state: TInitialTasksState = { tasks: [] },
  action: TTaskAction,
) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    default:
      return state;
  }
};
