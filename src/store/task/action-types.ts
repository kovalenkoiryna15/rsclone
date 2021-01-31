import ITask from 'Entities/task-entities';

export type TasksState = {
  tasks: Array<ITask>;
  newTaskTitle: string;
};
