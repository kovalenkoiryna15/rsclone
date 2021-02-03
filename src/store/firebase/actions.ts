import axios from 'axios';

import ITask from 'Entities/task-entities';
import ITimeEntry from 'Entities/time-entry';
import * as Types from 'Entities/types';
import firebase from 'firebase';
import { database } from 'Store/src/firebase';
import * as MyModels from 'Store/types';
import { HIDE_LOADER, SHOW_LOADER } from './action-constants';
import DataSnapshot = firebase.database.DataSnapshot;

const url: string = process.env.REACT_APP_DB_URL!;

export const showLoader = (): MyModels.IAction<undefined> => ({
  type: SHOW_LOADER,
  payload: undefined,
});

export const hideLoader = (): MyModels.IAction<undefined> => ({
  type: HIDE_LOADER,
  payload: undefined,
});

export const pushTask = async (
  task: Omit<ITask, 'id'>, userID: Types.ID,
): Promise<ITask> => {
  const taskListRef = database.ref(`${userID}/tasks`);
  const newTaskRef = await taskListRef.push();
  await newTaskRef.set(task);
  return newTaskRef.key
    ? Promise.resolve({ ...task, id: newTaskRef.key })
    : Promise.reject(Error("I can't get task ref!"));
};

const parseTasksSnapshot = (tasksSnapshot: DataSnapshot) => {
  const tasks = [] as Array<ITask>;
  tasksSnapshot.forEach((taskSnapshot) => {
    const timeEntries = [] as Array<ITimeEntry>;
    if (taskSnapshot.hasChild('timeEntries')) {
      taskSnapshot.child('timeEntries').forEach((timeEntry) => {
        timeEntries.push({
          ...timeEntry.val(),
          id: timeEntry.key,
        });
      });
    }
    tasks.push({
      ...taskSnapshot.val(),
      id: taskSnapshot.key,
      timeEntries,
    });
  });
  return tasks;
};

export const fetchTasks = async (userID: Types.ID): Promise<Array<ITask>> => {
  const taskListRef = database.ref(`${userID}/tasks`);
  const tasks: Array<ITask> = [] as Array<ITask>;
  await taskListRef.once('value', (tasksSnapshot) => {
    tasks.push(...parseTasksSnapshot(tasksSnapshot));
  });
  return Promise.resolve(tasks);
};

export const putTask = async (task: ITask, userID: Types.ID): Promise<ITask> => {
  const { id, ...rest } = task;
  const taskRef = database.ref(`${userID}/tasks/${id}`);
  await taskRef.set({ ...rest });
  return Promise.resolve(task);
};

export const deleteTask = (id: Types.ID): Promise<undefined> => axios.delete(`${url}/tasks/${id}.json`);
