import { ADD_PROJECT, FETCH_PROJECTS } from './project-action-constants';

import { IProject } from '../../entities/project-entities';
import { TAddProjectAction, TFetchProjectsAction } from './project-action-types';

export const addProject = (newProject: IProject): TAddProjectAction => ({
  type: ADD_PROJECT,
  newProject,
});

export const fetchProjects = (projects: IProject[]): TFetchProjectsAction => ({
  type: FETCH_PROJECTS,
  projects,
});
