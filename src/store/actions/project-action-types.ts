import { IProject } from '../../entities/project-entities';

export interface TAddProjectAction {
  type: string;
  newProject: IProject;
}

export interface TFetchProjectsAction {
  type: string;
  projects: IProject[];
}

export interface TInitialProjectsState {
  projects: IProject[],
}

export type TProjectAction =
  | TAddProjectAction;
