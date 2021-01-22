import * as MyModels from 'Store/types';
import { IProject } from 'Entities/project-entities';
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
import { IProjectState } from './project-action-types';

const DATA_URL = 'https://kovalenkoiryna15.github.io/fake-projects/db.json';

export const addProject = (newProject: IProject): MyModels.IAction<IProject> => ({
  type: ADD_PROJECT,
  payload: newProject,
});

export const updateProject = (project: IProject): MyModels.IAction<IProject> => ({
  type: UPDATE_PROJECT,
  payload: project,
});

export const deleteProject = (project: IProject): MyModels.IAction<IProject> => ({
  type: DELETE_PROJECT,
  payload: project,
});

export const fetchProjectsSuccess = (projects: IProject[]): MyModels.IAction<Array<IProject>> => ({
  type: FETCH_PROJECTS_SUCCESS,
  payload: projects,
});

export const fetchProjectsFailure = (error: Error): MyModels.IAction<Error> => ({
  type: FETCH_PROJECTS_FAILURE,
  payload: error,
});

export const showLoader = (): MyModels.IAction<undefined> => ({
  type: SHOW_LOADER,
  payload: undefined,
});

export const hideLoader = (): MyModels.IAction<undefined> => ({
  type: HIDE_LOADER,
  payload: undefined,
});

export const showError = (): MyModels.IAction<undefined> => ({
  type: SHOW_ERROR,
  payload: undefined,
});

export const fetchProjects = (
): MyModels.AsyncDispatch<IProjectState, any> => async (dispatch) => {
  try {
    dispatch(showLoader());
    const response: Response = await fetch(DATA_URL);
    const data: IProjectState = await response.json() as IProjectState;
    const { projects } = data;
    dispatch(fetchProjectsSuccess(projects));
    dispatch(hideLoader());
  } catch (error) {
    dispatch(fetchProjectsFailure(error));
  }
};
