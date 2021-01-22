import * as React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IProject } from '../../entities/project-entities';

import { addProject } from 'Store/project/project-action-creators';

interface ProjectFormProps {
  projectData?: IProject;
  show: boolean;
  handleShow: (event: React.MouseEvent<HTMLElement>) => void;
  addProject: (newProject: IProject) => void;
}

interface ProjectFormState {
  id: string;
  name: string;
  deadline: string;
  estimatedTime: string;
  color: string;
}

class ProjectForm extends React.Component<ProjectFormProps, ProjectFormState> {
  constructor(props: ProjectFormProps) {
    super(props);
    this.state = {
      id: '',
      name: '',
      deadline: '',
      estimatedTime: '',
      color: '#000000',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(
    event: React.MouseEvent<HTMLElement>,
  ) {
    this.setState((state) => ({
      ...state,
      id: '',
      name: '',
      deadline: '',
      estimatedTime: '',
      color: '#000000',
    }));

    const { handleShow } = this.props;
    handleShow(event);
  }

  handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    event.persist();
    this.setState((state) => {
      const { name, value } = event.target;
      return {
        ...state,
        [name]: value,
      };
    });
  }

  handleSave(
    event: React.MouseEvent<HTMLElement>,
  ) {
    event.preventDefault();
    const {
      id, name, deadline, estimatedTime, color,
    } = this.state;
    const newProject = {
      id, name, deadline, estimatedTime, color,
    };
    if (!id) {
      newProject.id = Date.now().toString();
    }
    this.props.addProject(newProject);

    this.setState((state) => ({
      ...state,
      id: '',
      name: '',
      deadline: '',
      estimatedTime: '',
      color: '#000000',
    }));

    const { handleShow } = this.props;
    handleShow(event);
  }

  render() {
    const {
      name, deadline, estimatedTime, color,
    } = this.state;
    const { show, handleShow } = this.props;
    return (
      <Modal
        show={show}
        onHide={this.handleClose}
        animation={false}
        className="project-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="project-form" onSubmit={this.handleSave}>
            <Form.Group controlId="formProjectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control type="text" placeholder="Project Name" name="name" value={name} onChange={this.handleChange} required />
            </Form.Group>
            <Form.Group controlId="formProjectDeadline">
              <Form.Label>Due date</Form.Label>
              <Form.Control type="date" value={deadline} name="deadline" onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="formProjectEstimatedTime">
              <Form.Label>Estimated Time</Form.Label>
              <Form.Control type="time" value={estimatedTime} name="estimatedTime" onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="formProjectColor">
              <Form.Label>Color</Form.Label>
              <Form.Control type="color" value={color} name="color" onChange={this.handleChange} />
            </Form.Group>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={this.handleSave}>
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  addProject,
};

export default connect(null, mapDispatchToProps)(ProjectForm);
