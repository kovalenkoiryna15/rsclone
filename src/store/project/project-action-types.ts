import { IProject } from 'Entities/project-entities';

export interface IProjectState {
  projects: IProject[];
  loading: boolean;
  error: Error | null;
}
