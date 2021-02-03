import IRSCloneTrackingTime from 'Entities/rsclone-tracking-time';
import ITask from 'Entities/task-entities';
import * as Types from 'Entities/types';
import * as React from 'react';
import { IProjectState } from 'Store/project/action-types';
import { TasksState } from 'Store/task/action-types';
import * as MyModels from 'Store/types';
import { IAction } from 'Store/types';
import {
  deleteTask,
  getTasks,
  hideLoader,
  pushTask,
  putTask,
  showLoader,
} from '../firebase/actions';
import {
  ADD,
  ADD_FAILURE,
  FETCH_TASKS,
  FETCH_TASKS_FAILURE,
  REMOVE_TASK,
  SET_NEW_TASK_TITLE,
  UPDATE,
  UPDATE_FAILURE,
} from './action-constants';

const JSON_URL = 'https://kovalenkoiryna15.github.io/fake-projects/db.json';

export const setTitle = (title: string): IAction<string> => ({
  type: SET_NEW_TASK_TITLE,
  payload: title,
});

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

export const fetchTasks = (userID: Types.ID): MyModels.AsyncDispatch<TasksState, any> => async (
  dispatch,
) => {
  dispatch(showLoader());
  try {
    await getTasks(userID)
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

export const removeTask = (id: Types.ID): MyModels.AsyncDispatch<TasksState, any> => async (
  dispatch,
) => {
  dispatch(showLoader());
  await deleteTask(id);
  dispatch({
    type: REMOVE_TASK,
    payload: id,
  });
  dispatch(hideLoader());
};

export const onChange = (e: React.ChangeEvent<HTMLInputElement>): IAction<string> => ({
  type: SET_NEW_TASK_TITLE,
  payload: e.target.value,
});

export const fetchTasksJSON = (): MyModels.AsyncDispatch<IProjectState, any> => async (
  dispatch,
) => {
  dispatch(showLoader());
  try {
    const response: Response = await fetch(JSON_URL);
    const { tasks } = await response.json() as IRSCloneTrackingTime;
    dispatch({
      type: FETCH_TASKS,
      payload: tasks,
    });
  } catch (error) {
    dispatch({
      type: FETCH_TASKS_FAILURE,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      payload: error,
    });
  }
  dispatch(hideLoader());
};
