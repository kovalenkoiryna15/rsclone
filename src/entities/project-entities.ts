export interface IProject {
  id: ID;
  name: string;
  deadline?: string;
  estimatedTime?: string;
  color?: string;
}

type ID = string | number;
