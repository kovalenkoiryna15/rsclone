import IProject from 'Entities/project-entities';
import IProjects from 'Entities/projects-entity';
import * as AppTypes from 'Entities/types';
import * as StateTypes from 'States/types';
import {
  ADD_PROJECT,
  DELETE_PROJECT,
  FETCH_PROJECTS_SUCCESS,
  HIDE_LOADER,
  REMOVE_PROJECT_FAILURE,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_PROJECT,
  WRITE_PROJECT_FAILURE,
} from './action-constants';
import { IProjectState } from './action-types';

const initialState: IProjectState = {
  projects: {} as IProjects<IProject>,
  isLoading: false,
  error: undefined,
};

const handlers: StateTypes.IHandlers<IProjectState, any> = {
  [ADD_PROJECT]: (state, { payload: project }: StateTypes.IAction<IProject>) => ({
    ...state,
    projects: { ...state.projects, [project.id]: project },
  }),
  [DELETE_PROJECT]: (state, { payload: id }: StateTypes.IAction<AppTypes.ID>) => ({
    ...state,
    projects: Object.fromEntries(
      Object.entries(state.projects).filter((project) => project[0] !== id)
    ),
  }),
  [FETCH_PROJECTS_SUCCESS]: (
    state,
    { payload: projects }: StateTypes.IAction<IProjects<IProject>>
  ) => ({
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
  [SHOW_ERROR]: (state, { payload: error }: StateTypes.IAction<typeof Error>) => ({
    ...state,
    error,
  }),
  [UPDATE_PROJECT]: (state, { payload }: StateTypes.IAction<IProject>) => ({
    ...state,
    projects: Object.fromEntries(
      Object.entries(state.projects).map(([key, value]) => {
        if (key === payload.id) {
          return [
            key,
            {
              ...value,
              ...payload,
            },
          ];
        }
        return [key, value];
      })
    ),
  }),
  [WRITE_PROJECT_FAILURE]: (
    state,
    { payload: error }: StateTypes.IAction<typeof Error>
  ) => ({
    ...state,
    error,
  }),
  [REMOVE_PROJECT_FAILURE]: (
    state,
    { payload: error }: StateTypes.IAction<typeof Error>
  ) => ({
    ...state,
    error,
  }),
  DEFAULT: (state) => state,
};

const projectsReducer: StateTypes.Reducer<IProjectState, any> = (
  state = initialState,
  action
) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default projectsReducer;
