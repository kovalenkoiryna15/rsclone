import IProject from 'Entities/project-entities';

export interface IProjectState {
  projects: Array<IProject>;
  isLoading: boolean;
  error?: Error;
}
