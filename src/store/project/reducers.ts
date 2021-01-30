import IProject from 'Entities/project-entities';
import * as Types from 'Entities/types';
import * as MyModels from 'Store/types';
import {
  ADD_PROJECT,
  DELETE_PROJECT,
  FETCH_PROJECTS_SUCCESS,
  HIDE_LOADER,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_PROJECT,
} from './action-constants';
import { IProjectState } from './action-types';

const initialState: IProjectState = {
  projects: [] as Array<IProject>,
  isLoading: false,
  error: undefined,
};

const handlers: MyModels.IHandlers<IProjectState, any> = {
  [ADD_PROJECT]: (state, { payload: project }: MyModels.IAction<IProject>) => ({
    ...state,
    projects: [...state.projects, project],
  }),
  [DELETE_PROJECT]: (state, { payload: id }: MyModels.IAction<Types.ID>) => ({
    ...state,
    projects: state.projects.filter((project) => project.id !== id),
  }),
  [FETCH_PROJECTS_SUCCESS]: (state, { payload: projects }: MyModels.IAction<Array<IProject>>) => ({
    ...state,
    projects,
  }),
  [HIDE_LOADER]: (state) => ({
    ...state,
    isLoading: false,
  }),
  [SHOW_LOADER]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [SHOW_ERROR]: (state, { payload: error }: MyModels.IAction<Error>) => ({
    ...state,
    error,
  }),
  [UPDATE_PROJECT]: (state, { payload }: MyModels.IAction<IProject>) => {
    const oldProjectIndex = state.projects.findIndex(
      (project) => project.id === payload.id,
    );
    const newStateProjects = [...state.projects];
    newStateProjects.splice(oldProjectIndex, 1, payload);
    return {
      ...state,
      projects: [...newStateProjects],
    };
  },
  DEFAULT: (state) => state,
};

const projectsReducer: MyModels.Reducer<IProjectState, any> = (
  state = initialState, action,
) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default projectsReducer;
