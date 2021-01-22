import * as MyModels from 'Store/types';
import IProject from 'Entities/project-entities';
import { IProjectState } from './action-types';
import {
  ADD_PROJECT,
  DELETE_PROJECT,
  FETCH_PROJECTS_SUCCESS,
  HIDE_LOADER,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_PROJECT,
} from './action-constants';

const initialState = {
  error: null,
  isLoading: false,
  projects: [],
};

const handlers: MyModels.IHandlers<IProjectState, any> = {
  [ADD_PROJECT]: (state, action: MyModels.IAction<IProject>) => ({
    ...state,
    projects: [...state.projects, action.payload],
  }),
  [DELETE_PROJECT]: (state, action: MyModels.IAction<IProject>) => ({
    ...state,
    projects: state.projects.filter((project) => project.id !== action.payload.id),
  }),
  [FETCH_PROJECTS_SUCCESS]: (state, action: MyModels.IAction<Array<IProject>>) => ({
    ...state,
    projects: action.payload,
  }),
  [HIDE_LOADER]: (state) => ({
    ...state,
    isLoading: false,
  }),
  [SHOW_LOADER]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [SHOW_ERROR]: (state, action: MyModels.IAction<Error>) => ({
    ...state,
    error: action.payload,
  }),
  [UPDATE_PROJECT]: (state, action: MyModels.IAction<IProject>) => ({
    ...state,
    projects: [...state.projects, action.payload],
  }),
  DEFAULT: (state) => state,
};

const projectsReducer: MyModels.Reducer<IProjectState, any> = (
  state = initialState, action,
) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default projectsReducer;
