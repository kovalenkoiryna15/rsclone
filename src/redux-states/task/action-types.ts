import ITask from 'Entities/task';

export type TasksState = {
  tasks: Array<ITask>;
  newTaskTitle: string;
  error?: typeof Error;
};
