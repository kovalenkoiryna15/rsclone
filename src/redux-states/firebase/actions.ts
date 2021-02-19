import firebase from 'firebase';

import ITask from 'Entities/task';
import ITimeEntry from 'Entities/time-entry';
import * as AppTypes from 'Entities/types';
import * as StateTypes from 'States/types';
import { database } from 'Utils/firebase';
import { HIDE_LOADER, SHOW_LOADER } from './action-types';
import DataSnapshot = firebase.database.DataSnapshot;

export const showLoader = (): StateTypes.IAction<undefined> => ({
  type: SHOW_LOADER,
  payload: undefined,
});

export const hideLoader = (): StateTypes.IAction<undefined> => ({
  type: HIDE_LOADER,
  payload: undefined,
});

export const pushTask = async (
  task: Omit<ITask, 'id'>,
  userID: AppTypes.ID
): Promise<ITask> => {
  const taskListRef = database.ref(`${userID}/tasks`);
  const newTaskRef = await taskListRef.push();
  await newTaskRef.set(task);
  return newTaskRef.key
    ? Promise.resolve({
        ...task,
        id: newTaskRef.key,
      })
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

export const fetchTasks = async (userID: AppTypes.ID): Promise<Array<ITask>> => {
  const taskListRef = database.ref(`${userID}/tasks`);
  const tasks: Array<ITask> = [] as Array<ITask>;
  await taskListRef.once('value', (tasksSnapshot) => {
    tasks.push(...parseTasksSnapshot(tasksSnapshot));
  });
  return Promise.resolve(tasks);
};

export const putTask = async (task: ITask, userID: AppTypes.ID): Promise<ITask> => {
  const { id, ...rest } = task;
  const taskRef = database.ref(`${userID}/tasks/${id}`);
  await taskRef.set({ ...rest });
  return Promise.resolve(task);
};

export const deleteTask = async (id: AppTypes.ID, userID: AppTypes.ID): Promise<any> =>
  database.ref(`${userID}/tasks/${id}`).remove();
