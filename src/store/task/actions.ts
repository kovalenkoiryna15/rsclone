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
  postTask,
  showLoader,
  toggleCompleteTask as putToggleCompleteTask,
} from '../firebase/actions';
import {
  ADD,
  FETCH_TASKS,
  FETCH_TASKS_FAILURE,
  REMOVE_TASK,
  SET_NEW_TASK_TITLE,
  TOGGLE_COMPLETE_TASK,
} from './action-constants';

const JSON_URL = 'https://kovalenkoiryna15.github.io/fake-projects/db.json';

export const setTitle = (title: string): IAction<string> => ({
  type: SET_NEW_TASK_TITLE,
  payload: title,
});

export const addTask = (title: string): MyModels.AsyncDispatch<TasksState, any> => async (
  dispatch,
) => {
  dispatch(showLoader());
  const task: Omit<ITask, 'id'> = {
    title,
    timeEntries: [],
    isCompleted: false,
  };
  const { id } = await postTask(task);
  dispatch({
    type: ADD,
    payload: {
      ...task,
      id,
    },
  });
  dispatch(hideLoader());
};

export const fetchTasksFirebase = (): MyModels.AsyncDispatch<TasksState, any> => async (
  dispatch,
) => {
  dispatch(showLoader());
  await getTasks()
    .then((tasks) => dispatch({
      type: FETCH_TASKS,
      payload: tasks,
    }));
  dispatch(hideLoader());
};

export const toggleCompleteTask = (id: Types.ID): MyModels.AsyncDispatch<TasksState, any> => async (
  dispatch, getState,
) => {
  dispatch(showLoader());
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { tasks: { tasks } } = getState();
  const task = tasks.find((t) => t.id === id);
  if (task) {
    await putToggleCompleteTask(task);
    dispatch({
      type: TOGGLE_COMPLETE_TASK,
      payload: id,
    });
    dispatch(hideLoader());
  }
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
  try {
    dispatch(showLoader());
    const response: Response = await fetch(JSON_URL);
    const { tasks } = await response.json() as IRSCloneTrackingTime;
    dispatch({
      type: FETCH_TASKS,
      payload: tasks,
    });
    dispatch(hideLoader());
  } catch (error) {
    dispatch({
      type: FETCH_TASKS_FAILURE,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      payload: error,
    });
  }
};
