import * as React from 'react';
import { connect } from 'react-redux';
const IconSVG = require('../../assets/icons/angle-right.svg') as string;
import { Nav, Navbar, Button, Spinner, Col } from 'react-bootstrap';
import ProjectForm from '../ProjectForm';
import { IProject } from '../../entities/project-entities';

import {
  fetchProjects,
} from '../../store/actions/project-action-creators';

interface TaskListNavState {
  show: boolean;
};

interface TaskListNavProps {
  projects: IProject[];
  loading: boolean;
  error: Error | null;
  fetchProjects: () => void;
};

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
    const { projects, loading, error } = this.props;
    if(loading) {
      return (
        <Spinner animation="border" role="status" variant="primary"></Spinner>
      )
    }

    return (
      <Navbar className="flex-column" expand="xxl">
        <Col className="task-list-nav">
          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <span className="navbar-toggler-icon" style={{ backgroundImage: `url(${IconSVG})`}} />
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="flex-column sidebar-nav bg-light">
              <Nav.Item>
                <Nav.Link href="#all-tasks">Tasks</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#projects-tasks">Projects</Nav.Link>
              </Nav.Item>
              <Button onClick={this.handleShow} >Add Project</Button>
              <br />
              <Nav.Item>
                <Nav.Link href="#no-project">no project</Nav.Link>
              </Nav.Item>
              {
                projects ?
                  projects.map((project: IProject) => {
                    const { id, name } = project;
                    const path = `#project/${id}`;
                    return (
                      <Nav.Item key={id}>
                        <Nav.Link href={path}>{name}</Nav.Link>
                      </Nav.Item>
                    );
                  }) :
                  <p>no projects</p>
              }
            </Nav>
            <ProjectForm show={show} handleShow={this.handleShow} />
          </Navbar.Collapse>
        </Col>
      </Navbar>
    );
  }
}

function mapStateToProps(state: any) {
  const { projects: { projects, loading, error } } = state;
  return { projects, loading, error };
};

const mapDispatchToProps = {
  fetchProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskListNav);
