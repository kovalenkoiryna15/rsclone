import IProject from 'Entities/project-entities';
import ITask from 'Entities/task-entities';

interface IRSCloneTrackingTime {
  user: string;
  tasks: Array<ITask>;
  projects: Array<IProject>;
}

export default IRSCloneTrackingTime;
