import ITask from 'Entities/task-entities';
import * as AppTypes from 'Entities/types';
import {
  deleteTask,
  fetchTasks,
  hideLoader,
  pushTask,
  putTask,
  showLoader,
} from 'State/firebase/actions';
import { TasksState } from 'State/task/action-types';
import * as StateTypes from 'State/types';
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
  userID: AppTypes.ID
): StateTypes.AsyncDispatch<TasksState, any> => async (dispatch) => {
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
};

export const add = (
  task: Omit<ITask, 'id'>,
  userID: AppTypes.ID
): StateTypes.AsyncDispatch<TasksState, any> => async (dispatch) => {
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
};

export const getTasks = (
  userID: AppTypes.ID
): StateTypes.AsyncDispatch<TasksState, any> => async (dispatch) => {
  dispatch(showLoader());
  try {
    await fetchTasks(userID).then((tasks) =>
      dispatch({
        type: FETCH_TASKS,
        payload: tasks,
      })
    );
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
  userID: AppTypes.ID
): StateTypes.AsyncDispatch<TasksState, any> => async (dispatch) => {
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
};
