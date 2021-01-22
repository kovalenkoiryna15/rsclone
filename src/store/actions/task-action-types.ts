import { ITask } from 'Entities/task-entities';

export interface ITaskState {
  readonly tasks: Array<ITask>,
}
