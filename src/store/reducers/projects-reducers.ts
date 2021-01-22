import { IProject } from 'Entities/project-entities';
import { IAction } from 'MyModels';
import * as MyModels from 'MyModels';
import { IProjectState } from 'Store/actions/project-action-types';
import {
  ADD_PROJECT,
  FETCH_PROJECTS_SUCCESS,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from '../actions/project-action-constants';

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

const handlers: MyModels.IHandlers<IProjectState, any> = {
  [ADD_PROJECT]: (state, action: IAction<IProject>) => ({
    ...state,
    projects: [...state.projects, action.payload],
  }),
  [UPDATE_PROJECT]: (state, action: IAction<IProject>) => ({
    ...state,
    projects: [...state.projects, action.payload],
  }),
  [DELETE_PROJECT]: (state, action: IAction<IProject>) => ({
    ...state,
    projects: state.projects.filter((project) => project.id !== action.payload.id),
  }),
  [FETCH_PROJECTS_SUCCESS]: (state, action: IAction<Array<IProject>>) => ({
    ...state,
    projects: action.payload,
  }),
  [SHOW_LOADER]: (state) => ({
    ...state,
    loading: true,
  }),
  [HIDE_LOADER]: (state) => ({
    ...state,
    loading: false,
  }),
  [SHOW_ERROR]: (state, action: IAction<Error>) => ({
    ...state,
    error: action.payload,
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
