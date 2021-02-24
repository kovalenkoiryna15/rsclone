import IProject from 'Entities/project';
import IProjects from 'Entities/projects';
import * as AppTypes from 'Entities/types';
import * as StateTypes from 'States/types';
import * as t from './action-types';
import { IProjectState } from './model';

const initialState: IProjectState = {
  projects: {} as IProjects<IProject>,
  isLoading: false,
  error: undefined,
};

const handlers: StateTypes.IHandlers<IProjectState, any> = {
  [t.ADD_PROJECT]: (state, { payload: project }: StateTypes.IAction<IProject>) => ({
    ...state,
    projects: { ...state.projects, [project.id]: project },
  }),
  [t.DELETE_PROJECT]: (state, { payload: id }: StateTypes.IAction<AppTypes.ID>) => ({
    ...state,
    projects: Object.fromEntries(
      Object.entries(state.projects).filter((project) => project[0] !== id)
    ),
  }),
  [t.FETCH_PROJECTS_SUCCESS]: (
    state,
    { payload: projects }: StateTypes.IAction<IProjects<IProject>>
  ) => ({
    ...state,
    projects,
  }),
  [t.HIDE_LOADER]: (state) => ({
    ...state,
    isLoading: false,
  }),
  [t.SHOW_LOADER]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [t.SHOW_ERROR]: (state, { payload: error }: StateTypes.IAction<typeof Error>) => ({
    ...state,
    error,
  }),
  [t.UPDATE_PROJECT]: (state, { payload }: StateTypes.IAction<IProject>) => ({
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
  [t.WRITE_PROJECT_FAILURE]: (
    state,
    { payload: error }: StateTypes.IAction<typeof Error>
  ) => ({
    ...state,
    error,
  }),
  [t.REMOVE_PROJECT_FAILURE]: (
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
