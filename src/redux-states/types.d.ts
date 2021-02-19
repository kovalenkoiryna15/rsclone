import { ThunkDispatch } from 'redux-thunk';

import { IFirebaseState } from 'States/firebase/action-types';
import { IProjectState } from 'States/project/action-types';
import { TaskListState } from 'States/task-list/action-types';
import { TaskState } from 'States/task/action-types';
import { IUserState } from 'States/user/action-types';

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
    [key: string]: T;
  }
) => Promise<void>;

export interface RootState {
  firebase: IFirebaseState;
  projects: IProjectState;
  taskList: TaskListState;
  tasks: TaskState;
  user: IUserState;
}
