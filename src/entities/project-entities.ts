import * as Types from './types';

export enum ProjectView {
  List,
  Board,
}

interface IProject {
  id: Types.ID;
  title: string;
  color?: string;
  deadline?: Date | null;
  defaultView?: ProjectView;
  estimatedTime?: number | null;
}

export default IProject;
