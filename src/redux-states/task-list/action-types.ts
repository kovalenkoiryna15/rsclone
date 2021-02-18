import ITask from 'Entities/task-entities';

export type TaskListState = {
  isVisibleEdit: boolean;
  selectedTask?: ITask;
  error?: typeof Error;
};
