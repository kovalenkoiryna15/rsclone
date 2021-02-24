import * as AppTypes from './types';
import ITimeEntry from './time-entry';

interface ITask {
  id: AppTypes.ID;
  title: string;
  deadline?: number;
  estimatedTime?: number;
  wastedTime?: number;
  project?: AppTypes.ID;
  timeEntries?: Array<ITimeEntry>;
  isCompleted: boolean;
}

export default ITask;
