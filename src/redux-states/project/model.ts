import IProject from 'Entities/project';
import IProjects from 'Entities/projects';

export interface IProjectState {
  projects: IProjects<IProject>;
  isLoading: boolean;
  error?: typeof Error;
}
