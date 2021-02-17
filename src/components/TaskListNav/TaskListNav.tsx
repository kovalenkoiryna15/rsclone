import * as React from 'react';
import { Button, Nav, Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

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

  handleShow(): void {
    this.setState((state) => {
      const { isVisible } = this.state;
      return {
        ...state,
        isVisible: !isVisible,
      };
    });
  }

  renderProjectList(): Array<JSX.Element> | JSX.Element {
    const { projects } = this.props;
    return projects ? (
      Object.values(projects).map((project: IProject) => {
        const { id, title, color } = project;
        return (
          <Nav.Item key={id} className="w-100 border-0 p-0 m-0 project-item">
            <NavLink
              className="w-100 project-link border-0  nav-link"
              style={{ color: `${color || '#2aa198'}` }}
              to={`/rsclone/project/${id}`}
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

  render(): JSX.Element {
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
            <NavLink className="w-100 border-0 nav-link" to="/rsclone/tasks">Tasks</NavLink>
          </Nav.Item>
          <Nav.Item className="w-100 border-0 px-3 py-2 m-0">
            <Nav.Link className="w-100 border-0 p-0 disabled" disabled>
              Projects
            </Nav.Link>
            <Button className="text-uppercase text-nowrap" onClick={() => this.handleShow()}>
              + Project
            </Button>
          </Nav.Item>
          {this.renderProjectList()}
        </Nav>
        <ProjectForm isVisible={isVisible} handleShow={() => this.handleShow()} />
      </SideBar>
    );
  }
}

export default TaskListNav;
