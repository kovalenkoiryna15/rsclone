import ITask from 'Entities/task';
import * as AppTypes from 'Entities/types';
import * as firebaseActions from 'States/firebase/actions';
import * as StateTypes from 'States/types';
import * as t from './action-types';
import { TaskState } from './model';

export const update = (
  task: ITask,
  userID: AppTypes.ID
): StateTypes.AsyncDispatch<TaskState, any> => async (dispatch) => {
  try {
    await firebaseActions.putTask(task, userID);
    dispatch({
      type: t.UPDATE,
      payload: task,
    });
  } catch (error) {
    dispatch({
      type: t.UPDATE_FAILURE,
      payload: error as Error,
    });
  }
};

export const add = (
  task: Omit<ITask, 'id'>,
  userID: AppTypes.ID
): StateTypes.AsyncDispatch<TaskState, any> => async (dispatch) => {
  try {
    const { id } = await firebaseActions.pushTask(task, userID);
    dispatch({
      type: t.ADD,
      payload: {
        ...task,
        id,
      },
    });
  } catch (error) {
    dispatch({
      type: t.ADD_FAILURE,
      payload: error as Error,
    });
  }
};

export const getTasks = (
  userID: AppTypes.ID
): StateTypes.AsyncDispatch<TaskState, any> => async (dispatch) => {
  dispatch(firebaseActions.showLoader());
  try {
    await firebaseActions.fetchTasks(userID).then((tasks) =>
      dispatch({
        type: t.FETCH_TASKS,
        payload: tasks,
      })
    );
  } catch (error) {
    dispatch({
      type: t.FETCH_TASKS_FAILURE,
      payload: error as Error,
    });
  }
  dispatch(firebaseActions.hideLoader());
};

export const removeTask = (
  task: ITask,
  userID: AppTypes.ID
): StateTypes.AsyncDispatch<TaskState, any> => async (dispatch) => {
  const { id } = task;
  try {
    await firebaseActions.deleteTask(id, userID);
    dispatch({
      type: t.REMOVE,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: t.REMOVE_FAILURE,
      payload: error as Error,
    });
  }
};
