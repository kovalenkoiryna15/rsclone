import IProject from 'Entities/project-entities';

export interface IProjectState {
  projects: IProject[];
  isLoading: boolean;
  error: Error | null;
}
