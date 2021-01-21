import { IProject } from '../../entities/project-entities';

export interface TInitialProjectsState {
  projects: IProject[];
  loading: boolean;
  error: Error | null;
}

export interface TAddProjectAction {
  type: string;
  payload: IProject;
}

export interface TUpdateProjectAction {
  type: string;
  payload: IProject;
}

export type TDeleteProjectAction = {
  type: string;
  payload: IProject;
};

export type TFetchProjectsAction = (dispatch: () => void) => Promise<void>;

export interface TShowLoaderAction {
  type: string;
  payload?: null;
}

export interface THideLoaderAction {
  type: string;
  payload?: null;
}

export interface TShowErrorAction {
  type: string;
  payload?: null;
}

export interface TFetchProjectsSuccessAction {
  type: string;
  payload: IProject[];
}

export interface TFetchProjectsFailureAction {
  type: string;
  payload: Error | null;
}

export type TProjectAction = TAddProjectAction
| TUpdateProjectAction
| TDeleteProjectAction
| TFetchProjectsSuccessAction
| TFetchProjectsFailureAction
| TShowLoaderAction
| THideLoaderAction;
