import * as React from 'react';
import { connect } from 'react-redux';
import { Nav, Spinner, Button } from 'react-bootstrap';

import SideBar from 'Components/SideBar';
import ProjectForm from 'Components/ProjectForm';
import { IProject } from 'Entities/project-entities';
import { fetchProjects } from 'Store/actions/project-action-creators';
import { TInitialProjectsState } from 'Store/actions/project-action-types';

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

  render() {
    const { show } = this.state;
    const { projects, loading } = this.props;
    if (loading) {
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
          <Button onClick={this.handleShow}>Add Project</Button>
          <br />
          <Nav.Item>
            <Nav.Link href="#no-project">no project</Nav.Link>
          </Nav.Item>
          {
            projects
              ? projects.map((project: IProject) => {
                const { id, name } = project;
                const path = `#project/${id}`;
                return (
                  <Nav.Item key={id}>
                    <Nav.Link href={path}>{name}</Nav.Link>
                  </Nav.Item>
                );
              })
              : <p>no projects</p>
          }
        </Nav>
        <ProjectForm show={show} handleShow={this.handleShow} />
      </SideBar>
    );
  }
}

function mapStateToProps(state: TInitialProjectsState) {
  const { projects: { projects, loading, error } } = state;
  return { projects, loading, error };
}

const mapDispatchToProps = {
  fetchProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskListNav);
