import ITask from 'Entities/task-entities';
import * as Types from 'Entities/types';
import * as React from 'react';
import { ITaskState } from 'Store/task/action-types';
import { IAction } from 'Store/types';
import * as MyModels from 'Store/types';
import {
  deleteTask,
  getTasks,
  hideLoader,
  postTask,
  showLoader,
  toggleCompleteTask as putToggleCompleteTask,
} from '../firebase/actions';
import {
  ADD_TASK,
  FETCH_TASKS,
  REMOVE_TASK,
  SET_NEW_TASK_TITLE,
  TOGGLE_COMPLETE_TASK,
} from './action-constants';

export const setTitle = (title: string): IAction<string> => ({
  type: SET_NEW_TASK_TITLE,
  payload: title,
});

export const addTask = (title: string): MyModels.AsyncDispatch<ITaskState, any> => async (
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
    type: ADD_TASK,
    payload: {
      ...task,
      id,
    },
  });
  dispatch(hideLoader());
};

export const fetchTasks = (): MyModels.AsyncDispatch<ITaskState, any> => async (
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

export const toggleCompleteTask = (id: Types.ID): MyModels.AsyncDispatch<ITaskState, any> => async (
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

export const removeTask = (id: Types.ID): MyModels.AsyncDispatch<ITaskState, any> => async (
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
