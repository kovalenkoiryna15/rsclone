import { ThunkDispatch } from 'redux-thunk';
import {
  ADD_PROJECT,
  HIDE_LOADER,
  SHOW_LOADER,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  SHOW_ERROR,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from './project-action-constants';
import { IProject } from '../../entities/project-entities';
import {
  TAddProjectAction,
  TShowLoaderAction,
  THideLoaderAction,
  TFetchProjectsSuccessAction,
  TFetchProjectsFailureAction,
  TFetchProjectsAction,
  TUpdateProjectAction,
  TDeleteProjectAction,
  TShowErrorAction,
  TInitialProjectsState,
  TProjectAction,
} from './project-action-types';

const DATA_URL = 'https://kovalenkoiryna15.github.io/fake-projects/db.json';

export const addProject = (newProject: IProject): TAddProjectAction => ({
  type: ADD_PROJECT,
  payload: newProject,
});

export const updateProject = (project: IProject): TUpdateProjectAction => ({
  type: UPDATE_PROJECT,
  payload: project,
});

export const deleteProject = (project: IProject): TDeleteProjectAction => ({
  type: DELETE_PROJECT,
  payload: project,
});

export const fetchProjectsSuccess = (projects: IProject[]): TFetchProjectsSuccessAction => ({
  type: FETCH_PROJECTS_SUCCESS,
  payload: projects,
});

export const fetchProjectsFailure = (error: Error): TFetchProjectsFailureAction => ({
  type: FETCH_PROJECTS_FAILURE,
  payload: error,
});

export const showLoader = (): TShowLoaderAction => ({
  type: SHOW_LOADER,
});

export const hideLoader = (): THideLoaderAction => ({
  type: HIDE_LOADER,
});

export const showError = (): TShowErrorAction => ({
  type: SHOW_ERROR,
});

export const fetchProjects = (): TFetchProjectsAction => async (
  dispatch: ThunkDispatch<TInitialProjectsState, any, TProjectAction>,
): Promise<void> => {
  try {
    dispatch(showLoader());
    const response: Response = await fetch(DATA_URL);
    const data: { projects: IProject[] } = await response.json();
    const { projects } = data;
    dispatch(fetchProjectsSuccess(projects));
    dispatch(hideLoader());
  } catch (error) {
    dispatch(fetchProjectsFailure(error));
  }
};
