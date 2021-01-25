import * as Types from './types';

export enum ProjectView {
  List,
  Board,
}

interface IProject {
  id: Types.ID;
  title: string;
  color?: string;
  deadline?: string;
  defaultView?: ProjectView;
  estimatedTime?: number;
}

export default IProject;
