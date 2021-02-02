import IProject from 'Entities/project-entities';
import * as React from 'react';
import { connect } from 'react-redux';

import { addProject, updateProject, writeProject } from 'Store/project/actions';
import * as MyModels from 'Store/types';
import ProjectForm from './ProjectForm';

type OwnProps = {
  handleShow: (event: React.MouseEvent<HTMLElement>) => void;
  isVisible: boolean;
  projectData?: IProject;
};

const mapStateToProps = (state: MyModels.RootState, ownProps: OwnProps) => ({
  handleShow: ownProps.handleShow,
  isVisible: ownProps.isVisible,
  projectData: ownProps.projectData,
  userID: state.user.user.id,
});

const mapDispatchToProps = {
  addProject,
  updateProject,
  writeProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
