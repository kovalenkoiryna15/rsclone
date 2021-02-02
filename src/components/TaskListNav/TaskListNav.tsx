import * as React from 'react';
import { Button, Nav, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as MyModels from 'Store/types';
import DropdownCustom from 'Components/DropdownCustom/index';
import ProjectForm from 'Components/ProjectForm';
import SideBar from 'Components/SideBar';
import IProject from 'Entities/project-entities';
import IProjects from 'Entities/projects-entity';

interface ITaskListNavState {
  isVisible: boolean;
}

interface ITaskListNavProps {
  projects: IProjects<IProject>;
  isLoading: boolean;
  error?: Error;
}

class TaskListNav extends React.Component<ITaskListNavProps, ITaskListNavState> {
  constructor(props: ITaskListNavProps) {
    super(props);
    this.state = {
      isVisible: false,
    };
    this.handleShow = this.handleShow.bind(this);
  }

  handleShow() {
    this.setState((state) => {
      const { isVisible } = this.state;
      return {
        ...state,
        isVisible: !isVisible,
      };
    });
  }

  renderProjectList() {
    const { projects } = this.props;
    return projects ? (
      Object.values(projects).map((project: IProject) => {
        const { id, title, color } = project;
        return (
          <Nav.Item key={id} className="w-100 border-0 p-0 m-0 project-item">
            <NavLink
              to={`/rsclone/project/${id}`}
              style={{ color: `${color || '#2aa198'}` }}
              className="w-100 project-link border-0  nav-link"
            >
              {title}
            </NavLink>
            <DropdownCustom project={project} />
          </Nav.Item>
        );
      })
    ) : (
      <p>no projects</p>
    );
  }

  render() {
    const { isVisible } = this.state;
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <Spinner animation="border" role="status" variant="primary" />
      );
    }

    return (
      <SideBar>
        <Nav className="flex-column sidebar-nav bg-light w-100 p-0" variant="pills">
          <Nav.Item className="w-100 border-0 p-0 m-0">
            <NavLink to="/rsclone/tasks" className="w-100 border-0 nav-link">Tasks</NavLink>
          </Nav.Item>
          <Nav.Item className="w-100 border-0 px-3 py-2 m-0">
            <Nav.Link disabled className="w-100 border-0 p-0 disabled">
              Projects
            </Nav.Link>
            <Button onClick={() => this.handleShow()} className="text-uppercase text-nowrap">
              + Add Project
            </Button>
          </Nav.Item>
          {this.renderProjectList()}
        </Nav>
        <ProjectForm isVisible={isVisible} handleShow={() => this.handleShow()} />
      </SideBar>
    );
  }
}

function mapStateToProps(state: MyModels.RootState) {
  const { projects: { projects, isLoading, error } } = state;
  return { projects, isLoading, error };
}

export default connect(mapStateToProps)(TaskListNav);
