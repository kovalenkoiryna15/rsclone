import { ThunkDispatch } from 'redux-thunk';

import { IFirebaseState } from 'States/firebase/model';
import { IProjectState } from 'States/project/model';
import { TaskListState } from 'States/task-list/model';
import { TaskState } from 'States/task/model';
import { IUserState } from 'States/user/model';

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
