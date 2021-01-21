import * as React from 'react';
import { Component, ChangeEvent } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface ProjectFormProps {
  projectData: Project;
}

interface ProjectFormState {
  loading: boolean;
  id: string;
  name: string;
  deadline: string;
  estimatedTime: string;
  color: string;
}

interface Project {
  id: string;
  name: string;
  deadline: string;
  estimatedTime: string;
  color: string;
}

export default class ProjectForm extends Component<ProjectFormProps, ProjectFormState> {
  constructor(props: ProjectFormProps) {
    super(props);
    const {
      projectData: {
        id, name, deadline, estimatedTime, color,
      },
    } = this.props;
    this.state = {
      id,
      name,
      deadline,
      estimatedTime,
      color,
      loading: true,
    };
    this.handleChange: () => void = this.handleChange.bind(this);
    this.handleClose: () => void = this.handleClose.bind(this);
    this.onProjectSave: () => void = this.onProjectSave.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
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
      name,
      deadline,
      estimatedTime,
      color,
      loading,
    } = this.state;
    console.log(loading);
    const show = true;
    const nodeRef = React.useRef(null);
    return (
      <Modal
        show={show}
        onHide={this.handleClose}
        animation={false}
        ref={nodeRef}
        className="project-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="project-form">
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
            <Button variant="primary" type="submit" onSubmit={this.onProjectSave}>
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
