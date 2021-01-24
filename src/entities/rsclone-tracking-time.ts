import IProject from 'Entities/project-entities';
import ITask from 'Entities/task-entities';
import { IUser } from './user-entities';

interface IRSCloneTrackingTime {
  user: IUser;
  tasks: Array<ITask>;
  projects: Array<IProject>;
}

export default IRSCloneTrackingTime;
