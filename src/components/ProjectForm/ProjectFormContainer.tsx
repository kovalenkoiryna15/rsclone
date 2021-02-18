import IProject from 'Entities/project-entities';
import * as React from 'react';
import { connect } from 'react-redux';

import { addProject, updateProject, writeProject } from 'States/project/actions';
import * as StateTypes from 'States/types';
import ProjectForm from './ProjectForm';

type OwnProps = {
  isVisible: boolean;
  onShow: (event: React.MouseEvent<HTMLElement>) => void;
  projectData?: IProject;
};

const mapStateToProps = (state: StateTypes.RootState, ownProps: OwnProps) => ({
  isVisible: ownProps.isVisible,
  onShow: ownProps.onShow,
  projectData: ownProps.projectData,
  userID: state.user.user.id,
});

const mapDispatchToProps = {
  addProject,
  updateProject,
  writeProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
