import IProject from 'Entities/project-entities';
import IProjects from 'Entities/projects-entity';
import * as Types from 'Entities/types';
import { database } from 'Utils/firebase';
import * as MyModels from 'State/types';
import {
  ADD_PROJECT,
  DELETE_PROJECT,
  FETCH_PROJECTS_FAILURE,
  FETCH_PROJECTS_SUCCESS,
  HIDE_LOADER,
  REMOVE_PROJECT_FAILURE,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_PROJECT,
  WRITE_PROJECT_FAILURE,
} from './action-constants';
import { IProjectState } from './action-types';
import SAMPLE from './localStorage';

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
  projects: IProjects<IProject>
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

const parseProjects = (data: IProjects<IProject>): IProjects<IProject> =>
  Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      {
        ...value,
        deadline: value.deadline || undefined,
      },
    ])
  );

export const fetchProjects = (
  idToken: string,
  userId: string
): MyModels.AsyncDispatch<IProjectState, any> => async (dispatch) => {
  try {
    dispatch(showLoader());
    const response: Response = await fetch(
      `https://fake-9d604-default-rtdb.firebaseio.com/${userId}/projects.json?auth=${idToken}`
    );
    const data = (await response.json()) as IProjects<IProject>;
    let parsedData;
    if (data) {
      parsedData = parseProjects(data);
      dispatch(fetchProjectsSuccess(parsedData));
    } else {
      const sampleProjects = localStorage.getItem('sampleProjects2021');
      let dataLocal;
      if (sampleProjects) {
        dataLocal = JSON.parse(sampleProjects) as IProjects<IProject>;
      } else {
        dataLocal = SAMPLE;
        localStorage.setItem('sampleProjects2021', JSON.stringify(dataLocal));
      }
      parsedData = parseProjects(dataLocal);
      dispatch(fetchProjectsSuccess(parsedData));
    }
    dispatch(hideLoader());
  } catch (error) {
    dispatch(fetchProjectsFailure(error));
  }
};

export const writeProject = (
  newProject: IProject,
  userId: string
): MyModels.AsyncDispatch<IProjectState, any> => async (dispatch) => {
  const { id, deadline } = newProject;
  const parsedProject = {
    ...newProject,
    deadline: deadline ? deadline.toISOString().substring(0, 10) : '',
  };
  try {
    await database.ref(`${userId}/projects/${id}`).set(parsedProject);
  } catch (error) {
    dispatch({
      type: WRITE_PROJECT_FAILURE,
      payload: error as Error,
    });
  }
};

export const removeProject = (
  id: Types.ID,
  userId: string
): MyModels.AsyncDispatch<IProjectState, any> => async (dispatch) => {
  try {
    await database.ref(`${userId}/projects/${id}`).remove();
  } catch (error) {
    dispatch({
      type: REMOVE_PROJECT_FAILURE,
      payload: error as Error,
    });
  }
};
