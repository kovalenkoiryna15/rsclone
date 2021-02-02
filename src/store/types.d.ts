import { ThunkDispatch } from 'redux-thunk';

import { IFirebaseState } from 'Store/firebase/action-types';
import { IProjectState } from 'Store/project/action-types';
import { TaskListState } from 'Store/task-list/action-types';
import { TasksState } from 'Store/task/action-types';
import { IUserState } from 'Store/user/action-types';

export interface IAction<P> {
  type: string;
  payload: P;
}
export type Reducer<S, P> = (state: S, action: IAction<P>) => S;

export interface IHandlers<S, P> {
  [key: string]: Reducer<S, P>;
}

export type AsyncDispatch<T, P> = (
  dispatch: ThunkDispatch<T, any, IAction<P>>,
  getState: () => {
    [key: string]: T,
  },
) => Promise<void>;

export interface RootState {
  firebase: IFirebaseState;
  projects: IProjectState;
  taskList: TaskListState;
  tasks: TasksState;
  user: IUserState;
}
