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
  show: boolean;
}

interface TaskListNavProps {
  projects: IProject[];
  loading: boolean;
  error: Error | null;
  fetchProjects: () => void;
}

class TaskListNav extends React.Component<TaskListNavProps, TaskListNavState> {
  constructor(props: TaskListNavProps) {
    super(props);
    this.state = {
      show: false,
    };
    this.handleShow = this.handleShow.bind(this);
  }

  componentDidMount() {
    this.props.fetchProjects();
  }

  handleShow() {
    this.setState((state) => {
      const { show } = this.state;
      return {
        ...state,
        show: !show,
      };
    });
  }

  renderProjectList() {
    const { projects } = this.props;
    return projects ? (
      projects.map((project: IProject) => {
        const { id, name } = project;
        const path = `/projects/${id}`;
        return (
          <Nav.Item key={id}>
            <NavLink to={path}>{name}</NavLink>
            <DropdownCustom id={id} />
          </Nav.Item>
        );
      })
    ) : (
      <p>no projects</p>
    );
  }

  render() {
    const { show } = this.state;
    const { loading } = this.props;
    if (loading) {
      return <Spinner animation="border" role="status" variant="primary" />;
    }

    return (
      <SideBar>
        <Nav className="flex-column sidebar-nav bg-light">
          <Nav.Item>
            <NavLink exact to="/tasks">
              Tasks
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/projects">Projects</NavLink>
          </Nav.Item>
          <Button onClick={this.handleShow}>Add Project</Button>
          <br />
          {this.renderProjectList()}
        </Nav>
        <ProjectForm show={show} handleShow={this.handleShow} />
      </SideBar>
    );
  }
}

function mapStateToProps(state: MyModels.RootReducer) {
  const {
    projects: { projects, loading, error },
  } = state;
  return { projects, loading, error };
}

const mapDispatchToProps = {
  fetchProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskListNav);
