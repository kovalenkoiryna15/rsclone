import * as React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import IProject from 'Entities/project-entities';
import { addProject } from 'Store/project/actions';

interface ProjectFormProps {
  projectData?: IProject;
  isVisible: boolean;
  handleShow: (event: React.MouseEvent<HTMLElement>) => void;
  addProject: (newProject: IProject) => void;
}

interface ProjectFormState {
  id: string;
  title: string;
  deadline?: Date;
  estimatedTime?: number;
  color?: string;
}

class ProjectForm extends React.Component<ProjectFormProps, ProjectFormState> {
  constructor(props: ProjectFormProps) {
    super(props);
    this.state = {
      id: '',
      title: '',
      deadline: undefined,
      estimatedTime: 0,
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
      id, title, deadline, estimatedTime, color,
    } = this.state;
    const newProject = {
      id, title, deadline, estimatedTime, color,
    };
    if (!id) {
      newProject.id = Date.now().toString();
    }
    this.props.addProject(newProject);

    this.setState((state) => ({
      ...state,
      id: '',
      title: '',
      deadline: undefined,
      estimatedTime: 0,
      color: '#000000',
    }));

    const { handleShow } = this.props;
    handleShow(event);
  }

  render() {
    const {
      title, deadline, estimatedTime, color,
    } = this.state;
    const { isVisible, handleShow } = this.props;
    return (
      <Modal
        show={isVisible}
        onHide={this.handleClose}
        animation={false}
        className="project-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="project-form"
            onSubmit={(e: React.MouseEvent<HTMLElement>) => this.handleSave(e)}
          >
            <Form.Group controlId="formProjectName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e)}
                placeholder="title"
                required
                type="text"
                value={title}
              />
            </Form.Group>
            <Form.Group controlId="formProjectDeadline">
              <Form.Label>Due date</Form.Label>
              <Form.Control
                name="deadline"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e)}
                type="date"
                value={deadline}
              />
            </Form.Group>
            <Form.Group controlId="formProjectEstimatedTime">
              <Form.Label>Estimated Time</Form.Label>
              <Form.Control
                name="estimatedTime"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e)}
                type="time"
                value={estimatedTime}
              />
            </Form.Group>
            <Form.Group controlId="formProjectColor">
              <Form.Label>Color</Form.Label>
              <Form.Control
                name="color"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e)}
                type="color"
                value={color}
              />
            </Form.Group>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={(e: React.MouseEvent<HTMLElement>) => this.handleSave(e)}
            >
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
