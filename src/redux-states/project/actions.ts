import IProject from 'Entities/project';
import IProjects from 'Entities/projects';
import * as AppTypes from 'Entities/types';
import * as StateTypes from 'States/types';
import { database } from 'Utils/firebase';
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
import { IProjectState } from './model';
import SAMPLE from './localStorage';

export const addProject = (newProject: IProject): StateTypes.IAction<IProject> => ({
  type: ADD_PROJECT,
  payload: newProject,
});

export const updateProject = (project: IProject): StateTypes.IAction<IProject> => ({
  type: UPDATE_PROJECT,
  payload: project,
});

export const deleteProject = (id: AppTypes.ID): StateTypes.IAction<AppTypes.ID> => ({
  type: DELETE_PROJECT,
  payload: id,
});

export const fetchProjectsSuccess = (
  projects: IProjects<IProject>
): StateTypes.IAction<IProjects<IProject>> => ({
  type: FETCH_PROJECTS_SUCCESS,
  payload: projects,
});

export const fetchProjectsFailure = (error: Error): StateTypes.IAction<Error> => ({
  type: FETCH_PROJECTS_FAILURE,
  payload: error,
});

export const showLoader = (): StateTypes.IAction<undefined> => ({
  type: SHOW_LOADER,
  payload: undefined,
});

export const hideLoader = (): StateTypes.IAction<undefined> => ({
  type: HIDE_LOADER,
  payload: undefined,
});

export const showError = (): StateTypes.IAction<undefined> => ({
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
): StateTypes.AsyncDispatch<IProjectState, any> => async (dispatch) => {
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
): StateTypes.AsyncDispatch<IProjectState, any> => async (dispatch) => {
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
  id: AppTypes.ID,
  userId: string
): StateTypes.AsyncDispatch<IProjectState, any> => async (dispatch) => {
  try {
    await database.ref(`${userId}/projects/${id}`).remove();
  } catch (error) {
    dispatch({
      type: REMOVE_PROJECT_FAILURE,
      payload: error as Error,
    });
  }
};
