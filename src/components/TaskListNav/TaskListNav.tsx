import * as React from 'react';
import { connect } from 'react-redux';
import { Nav, Spinner, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import * as MyModels from 'Store/types';
import SideBar from 'Components/SideBar';
import ProjectForm from 'Components/ProjectForm';
import IProject from 'Entities/project-entities';
import { fetchProjects } from 'Store/project/actions';
import DropdownCustom from 'Components/DropdownCustom/index';

interface TaskListNavState {
  isVisible: boolean;
}

interface TaskListNavProps {
  projects: IProject[];
  isLoading: boolean;
  error: Error | null;
  fetchProjects: () => void;
}

class TaskListNav extends React.Component<TaskListNavProps, TaskListNavState> {
  constructor(props: TaskListNavProps) {
    super(props);
    this.state = {
      isVisible: false,
    };
    this.handleShow = this.handleShow.bind(this);
  }

  componentDidMount() {
    this.props.fetchProjects();
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
      projects.map((project: IProject) => {
        const { id, title } = project;
        return (
          <Nav.Item key={id}>
            <NavLink to={`/projects/${id}`}>{title}</NavLink>
            <DropdownCustom id={id} />
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
        <Nav className="flex-column sidebar-nav bg-light">
          <Nav.Item>
            <Nav.Link href="#all-tasks">Tasks</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Projects</Nav.Link>
          </Nav.Item>
          <Button
            onClick={() => this.handleShow()}
          >
            Add Project
          </Button>
          <br />
          {this.renderProjectList()}
        </Nav>
        <ProjectForm isVisible={isVisible} handleShow={this.handleShow} />
      </SideBar>
    );
  }
}

function mapStateToProps(state: MyModels.RootReducer) {
  const { projects: { projects, isLoading, error } } = state;
  return { projects, isLoading, error };
}

const mapDispatchToProps = {
  fetchProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskListNav);
