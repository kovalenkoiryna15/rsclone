import { ADD_PROJECT } from '../actions/project-action-constants';
import { TProjectAction, TInitialProjectsState } from '../actions/project-action-types';

export const projectsReducer = (
  state: TInitialProjectsState = { projects: [] },
  action: TProjectAction
) => {
  switch (action.type) {
    case ADD_PROJECT:
      return { ...state, projects: [...state.projects, action.newProject] };
    default:
      return state;
  }
};
