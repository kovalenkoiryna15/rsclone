import {
  ADD_PROJECT,
  FETCH_PROJECTS_SUCCESS,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from '../actions/project-action-constants';
import {
  TProjectAction,
  TInitialProjectsState,
} from '../actions/project-action-types';

const InitialProjectsState = {
  projects: [],
  loading: false,
  error: null,
};

const projectsReducer = (
  state: TInitialProjectsState = InitialProjectsState,
  action: TProjectAction,
): TInitialProjectsState => {
  switch (action.type) {
    case ADD_PROJECT:
      return { ...state, projects: [...state.projects, action.payload] };
    case UPDATE_PROJECT:
      return { ...state, projects: [...state.projects, action.payload] };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== action.payload.id),
      };
    case FETCH_PROJECTS_SUCCESS:
      return { ...state, projects: action.payload };
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    case SHOW_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default projectsReducer;
