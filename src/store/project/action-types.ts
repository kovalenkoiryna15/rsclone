import IProject from 'Entities/project-entities';
import IProjects from 'Entities/projects-entity';

export interface IProjectState {
  projects: IProjects<IProject>;
  isLoading: boolean;
  error?: Error;
}
