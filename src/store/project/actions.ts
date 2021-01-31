import * as MyModels from 'Store/types';
import { database } from 'Store/src/firebase';
import IProject from 'Entities/project-entities';
import IProjects from 'Entities/projects-entity';
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

export const fetchProjectsSuccess = (
  projects: IProjects<IProject>,
): MyModels.IAction<IProjects<IProject>> => ({
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

const parseProjects = (
  data: IProjects<IProject>,
): IProjects<IProject> => Object.fromEntries(Object.entries(data)
  .map(([key, value]) => [key, {
    ...value,
    ...{ deadline: value.deadline ? new Date(value.deadline) : undefined },
  }]));

export const fetchProjects = (
  idToken: string,
  userId: string,
): MyModels.AsyncDispatch<IProjectState, any> => async (dispatch) => {
  try {
    dispatch(showLoader());
    const response: Response = await fetch(`https://fake-9d604-default-rtdb.firebaseio.com/${userId}/projects.json?auth=${idToken}`);
    const data = await response.json() as IProjects<IProject>;
    if (data) {
      const parsedData = parseProjects(data);
      dispatch(fetchProjectsSuccess(parsedData));
    } else {
      dispatch(fetchProjectsSuccess({}));
    }
    dispatch(hideLoader());
  } catch (error) {
    dispatch(fetchProjectsFailure(error));
  }
};

export const writeProject = (
  newProject: IProject,
  userId: string,
): MyModels.AsyncDispatch<IProjectState, any> => async () => {
  const { id, deadline }: {
    id: Types.ID, deadline: Date | null,
  } = newProject as { id: Types.ID, deadline: Date | null};
  const parsedProject = {
    ...newProject,
    deadline: deadline ? new Date(deadline).toISOString().substring(0, 10) : '',
  };
  try {
    await database.ref(`${userId}/projects/${id}`).set(parsedProject);
  } catch (error) {
    console.log(error);
  }
};

export const removeProject = (
  id: Types.ID,
  userId: string,
): MyModels.AsyncDispatch<IProjectState, any> => async () => {
  try {
    await database.ref(`${userId}/projects/${id}`).remove();
  } catch (error) {
    console.log(error);
  }
};
