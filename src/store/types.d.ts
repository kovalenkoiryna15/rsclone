import { ThunkDispatch } from 'redux-thunk';

import { IProjectState } from 'Store/actions/project-action-types';
import { ITaskState } from 'Store/actions/task-action-types';

declare module 'MyModels' {
  export interface IAction<P> {
    type: string,
    payload: P,
  }
  export type Reducer<S, P> = (state: S, action: IAction<P>) => S;
  export interface IHandlers<S, P> {
    [key: string]: Reducer<S, P>,
  }
  export type AsyncDispatch<T, P> = (dispatch: ThunkDispatch<T, any, IAction<P>>) => Promise<void>;
  export interface RootReducer {
    tasks: ITaskState,
    projects: IProjectState,
  }
}
