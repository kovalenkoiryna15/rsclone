import ADD_TASK from 'Store/actions/task-action-constants';
import { TTaskAction, TInitialTasksState } from 'Store/actions/task-action-types';

const tasksReducer = (
  state: TInitialTasksState = { tasks: [] },
  action: TTaskAction,
): TInitialTasksState => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    default:
      return state;
  }
};

export default tasksReducer;
