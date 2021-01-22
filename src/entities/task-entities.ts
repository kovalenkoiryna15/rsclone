import * as Types from './types';
import ITimeEntry from './time-entry';

interface ITask {
  id: Types.ID;
  title: string;
  deadline?: Date;
  estimatedTime?: number;
  wastedTime?: number;
  project?: Types.ID;
  timeEntries: Array<ITimeEntry>;
  isCompleted: string;
}

export default ITask;
