import { ThunkDispatch } from 'redux-thunk';

import { IProjectState } from 'Store/project/action-types';
import { ITaskState } from 'Store/task/action-types';

export interface IAction<P> {
  type: string,
  payload: P,
}
export type Reducer<S, P> = (state: S, action: IAction<P>) => S;
export interface IHandlers<S, P> {
  [key: string]: Reducer<S, P>,
}
export type AsyncDispatch<T, P> = (
  dispatch: ThunkDispatch<T, any, IAction<P>>,
  getState: () => {
    [key: string]: T,
  },
) => Promise<void>;
export interface RootReducer {
  tasks: ITaskState,
  projects: IProjectState,
}
