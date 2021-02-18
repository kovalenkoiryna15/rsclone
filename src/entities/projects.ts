type IProjects<T> = {
  [key in string | number]: T;
};

export default IProjects;
