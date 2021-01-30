import * as React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import IProject from 'Entities/project-entities';
import { addProject, updateProject } from 'Store/project/actions';

interface ProjectFormProps {
  projectData?: IProject;
  isVisible: boolean;
  handleShow: (event: React.MouseEvent<HTMLElement>) => void;
  addProject: (newProject: IProject) => void;
  updateProject: (newProject: IProject) => void;
}

interface ProjectFormState {
  id: string;
  title: string;
  deadline?: string;
  estimatedTime?: number;
  color?: string;
  validated: boolean;
}

class ProjectForm extends React.Component<ProjectFormProps, ProjectFormState> {
  constructor(props: ProjectFormProps) {
    super(props);
    const { projectData } = props;
    if (projectData) {
      const {
        id, title, deadline, estimatedTime, color,
      } = projectData;
      this.state = {
        id,
        title,
        deadline,
        estimatedTime,
        color,
        validated: false,
      };
    } else {
      this.state = {
        id: '',
        title: '',
        deadline: undefined,
        estimatedTime: 0,
        color: '#000000',
        validated: false,
      };
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState((state) => ({
      ...state,
      validated: true,
    }));

    const {
      id, title, deadline, estimatedTime, color,
    } = this.state;
    const newProject = {
      id, title, deadline, estimatedTime, color,
    };
    if (id) {
      this.props.updateProject(newProject);
    } else {
      newProject.id = Date.now().toString();
      this.props.addProject(newProject);
    }
  };

  handleClose(
    event: React.MouseEvent<HTMLElement>,
  ) {
    const { projectData } = this.props;
    if (!projectData) {
      this.setState((state) => ({
        ...state,
        id: '',
        title: '',
        deadline: undefined,
        estimatedTime: 0,
        color: '#000000',
        validated: false,
      }));
    } else {
      this.setState((state) => ({
        ...state,
        validated: false,
      }));
    }
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

  render() {
    const {
      title, deadline, estimatedTime, color, validated,
    } = this.state;
    const { isVisible } = this.props;

    return (
      <Modal
        show={isVisible}
        onHide={(e: React.MouseEvent<HTMLElement>) => this.handleClose(e)}
        animation={false}
        className="project-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="project-form"
            validated={validated}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.handleSubmit(e)}
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
            <Button variant="secondary" onClick={(e: React.MouseEvent<HTMLElement>) => this.handleClose(e)}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={(e: React.MouseEvent<HTMLFormElement>) => this.handleSubmit(e)}
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
  updateProject,
};

export default connect(null, mapDispatchToProps)(ProjectForm);
