import * as MyModels from 'Store/types';
import IProject from 'Entities/project-entities';
import * as Types from 'Entities/types';
import {
  ADD_PROJECT,
  HIDE_LOADER,
  SHOW_LOADER,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  SHOW_ERROR,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from './action-constants';
import { IProjectState } from './action-types';

export const addProject = (newProject: IProject): MyModels.IAction<IProject> => ({
  type: ADD_PROJECT,
  payload: newProject,
});

export const updateProject = (project: IProject): MyModels.IAction<IProject> => ({
  type: UPDATE_PROJECT,
  payload: project,
});

export const deleteProject = (id: Types.ID): MyModels.IAction<Types.ID> => ({
  type: DELETE_PROJECT,
  payload: id,
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
  idToken: string,
): MyModels.AsyncDispatch<IProjectState, any> => async (dispatch) => {
  try {
    dispatch(showLoader());
    const response: Response = await fetch(`https://fake-9d604-default-rtdb.firebaseio.com/projects.json?auth=${idToken}`);
    const data = await response.json() as IProject[];
    dispatch(fetchProjectsSuccess(data));
    dispatch(hideLoader());
  } catch (error) {
    dispatch(fetchProjectsFailure(error));
  }
};
