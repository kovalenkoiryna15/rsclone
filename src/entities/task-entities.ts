export interface ITask {
  id: string;
  name: string;
  deadline: string;
  estimatedTime: string;
  wastedTime: string;
  project: string;
  timeEntries: ITimeEntry[];
  isDone: string;
}

export interface ITimeEntry {
  startDate: string;
  duration: string;
  comment: string;
}
