import ITask from 'Entities/task-entities';
import * as Types from 'Entities/types';
import {
  deleteTask,
  fetchTasks,
  hideLoader,
  pushTask,
  putTask,
  showLoader,
} from 'Store/firebase/actions';
import { TasksState } from 'Store/task/action-types';
import * as MyModels from 'Store/types';
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

export const update = (
  task: ITask,
  userID: Types.ID,
): MyModels.AsyncDispatch<TasksState, any> => async (dispatch) => {
  dispatch(showLoader());
  try {
    await putTask(task, userID);
    dispatch({
      type: UPDATE,
      payload: task,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_FAILURE,
      payload: error as Error,
    });
  }
  dispatch(hideLoader());
};

export const add = (
  task: Omit<ITask, 'id'>,
  userID: Types.ID,
): MyModels.AsyncDispatch<TasksState, any> => async (dispatch) => {
  dispatch(showLoader());
  try {
    const { id } = await pushTask(task, userID);
    dispatch({
      type: ADD,
      payload: {
        ...task,
        id,
      },
    });
  } catch (error) {
    dispatch({
      type: ADD_FAILURE,
      payload: error as Error,
    });
  }
  dispatch(hideLoader());
};

export const getTasks = (userID: Types.ID): MyModels.AsyncDispatch<TasksState, any> => async (
  dispatch,
) => {
  dispatch(showLoader());
  try {
    await fetchTasks(userID)
      .then((tasks) => dispatch({
        type: FETCH_TASKS,
        payload: tasks,
      }));
  } catch (error) {
    dispatch({
      type: FETCH_TASKS_FAILURE,
      payload: error as Error,
    });
  }
  dispatch(hideLoader());
};

export const removeTask = (
  task: ITask,
  userID: Types.ID,
): MyModels.AsyncDispatch<TasksState, any> => async (dispatch) => {
  dispatch(showLoader());
  const { id } = task;
  try {
    await deleteTask(id, userID);
    dispatch({
      type: REMOVE,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_FAILURE,
      payload: error as Error,
    });
  }
  dispatch(hideLoader());
};
