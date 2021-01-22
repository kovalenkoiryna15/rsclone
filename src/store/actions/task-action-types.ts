import { ITask } from 'Entities/task-entities';

export interface TAddTaskAction {
  type: string;
  payload: ITask;
}

export interface TInitialTasksState {
  tasks: ITask[],
}

export type TTaskAction =
  | TAddTaskAction;
