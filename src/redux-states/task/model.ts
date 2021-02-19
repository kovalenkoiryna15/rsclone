import ITask from 'Entities/task';

export type TaskState = {
  tasks: Array<ITask>;
  newTaskTitle: string;
  error?: typeof Error;
};
