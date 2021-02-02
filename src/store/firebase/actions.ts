import axios from 'axios';

import ITask from 'Entities/task-entities';
import ITimeEntry from 'Entities/time-entry';
import * as Types from 'Entities/types';
import { database } from 'Store/src/firebase';
import { FirebaseData } from 'Store/firebase/action-types';
import * as MyModels from 'Store/types';
import { HIDE_LOADER, SHOW_LOADER } from './action-constants';

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
  return Promise.resolve({ ...task, id: newTaskRef.key! });
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const parseTask = (data: FirebaseData<ITask>) => Object.entries(data)
  .map(([
    key, {
      deadline,
      timeEntries,
      ...rest
    },
  ]) => ({
    id: key,
    deadline,
    timeEntries: timeEntries
      ? timeEntries.map(
        ({
          startDate,
          ...timeEntryRest
        }: ITimeEntry) => ({
          startDate: new Date(startDate),
          ...timeEntryRest,
        }),
      )
      : [],
    ...rest,
  }));

export const getTasks = async (userID: Types.ID): Promise<Array<ITask>> => {
  const ref = database.ref(`${userID}/tasks`);
  const result: Array<ITask> = [] as Array<ITask>;
  await ref.once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      result.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });
  });
  return Promise.resolve(result);
};

export const toggleCompleteTask = (task: ITask): Promise<ITask> => {
  const {
    id,
    isCompleted,
    ...rest
  } = task;
  return axios.put(
    `${url}/tasks/${id}.json`,
    { isCompleted: !isCompleted, ...rest },
  );
};

export const putTask = (task: ITask): Promise<ITask> => {
  const { id, ...rest } = task;
  return axios.put(
    `${url}/tasks/${id}.json`,
    { ...rest },
  );
};

export const deleteTask = (id: Types.ID): Promise<undefined> => axios.delete(`${url}/tasks/${id}.json`);
