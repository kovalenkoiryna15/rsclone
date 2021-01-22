import axios from 'axios';

import ITask from 'Entities/task-entities';
import ITimeEntry from 'Entities/time-entry';
import * as Types from 'Entities/types';
import { FirebaseData } from 'Store/firebase/action-types';
import * as MyModels from 'Store/types';
import { HIDE_LOADER, SHOW_LOADER } from './action-constants';
import { AXIOS_TIMEOUT } from './constants';

const url: string = process.env.REACT_APP_DB_URL!;

export const showLoader = (): MyModels.IAction<undefined> => ({
  type: SHOW_LOADER,
  payload: undefined,
});

export const hideLoader = (): MyModels.IAction<undefined> => ({
  type: HIDE_LOADER,
  payload: undefined,
});

export const postTask = async (task: Omit<ITask, 'id'>): Promise<ITask> => axios.post<ITask>(
  `${url}/tasks.json`, task,
)
  .then(
    (response) => {
      if (
        (response.status === 200 || response.status === 201)
        && response.data
      ) {
        return response.data;
      }
      throw new Error(`Response status: ${response.status}`);
    },
  );

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
    deadline: deadline ? new Date(deadline) : deadline,
    timeEntries: timeEntries.map(
      ({
        startDate,
        ...timeEntryRest
      }: ITimeEntry) => ({
        startDate: new Date(startDate),
        ...timeEntryRest,
      }),
    ),
    ...rest,
  }));

export const getTasks = () => axios
  .get<FirebaseData<ITask>>(`${url}/tasks.json`, { timeout: AXIOS_TIMEOUT })
  .then((response) => {
    if (response.status === 200 && response.data) {
      return parseTask(response.data);
    }
    return [];
  });

export const completeTask = (task: ITask) => {
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

export const deleteTask = (id: Types.ID) => axios.delete(`${url}/tasks/${id}.json`);
