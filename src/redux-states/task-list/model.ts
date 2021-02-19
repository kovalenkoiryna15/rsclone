import ITask from 'Entities/task';

export type TaskListState = {
  isVisibleEdit: boolean;
  selectedTask?: ITask;
  error?: typeof Error;
};
