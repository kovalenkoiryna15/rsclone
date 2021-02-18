import IProject from 'Entities/project';
import ITask from 'Entities/task';
import IUser from 'Entities/user';

interface IRSCloneTrackingTime {
  user: IUser;
  tasks: Array<ITask>;
  projects: Array<IProject>;
}

export default IRSCloneTrackingTime;
