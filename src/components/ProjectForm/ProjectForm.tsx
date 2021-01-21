import * as React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface ProjectFormProps {
  projectData: undefined | Project,
  onProjectSave: () => void,
  handleClose: () => void,
  handleChange: () => void,
}

interface Project {
  name: string;
  deadline: string;
  estimatedTime: string;
  color: string;
}

export default function ProjectForm({
  projectData, onProjectSave, handleClose, handleChange,
}: ProjectFormProps) {
  const show = true;
  const nodeRef = React.useRef(null);
  if (projectData) {
    const {
      name,
      deadline,
      estimatedTime,
      color,
    } = projectData;
    return (
      <Modal
        show={show}
        onHide={handleClose}
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
              <Form.Control type="text" placeholder="Project Name" value={name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formProjectDeadline">
              <Form.Label>Due date</Form.Label>
              <Form.Control type="date" value={deadline} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formProjectEstimatedTime">
              <Form.Label>Estimated Time</Form.Label>
              <Form.Control type="time" value={estimatedTime} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formProjectColor">
              <Form.Label>Color</Form.Label>
              <Form.Control type="color" value={color} onChange={handleChange} />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onSubmit={onProjectSave}>
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
  return (
    <Modal
      show={show}
      onHide={handleClose}
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
            <Form.Control type="text" placeholder="Project Name" onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formProjectDeadline">
            <Form.Label>Due date</Form.Label>
            <Form.Control type="date" onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formProjectEstimatedTime">
            <Form.Label>Estimated Time</Form.Label>
            <Form.Control type="time" onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formProjectColor">
            <Form.Label>Color</Form.Label>
            <Form.Control type="color" onChange={handleChange} />
          </Form.Group>
          <div className="form-footer">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onSubmit={onProjectSave}>
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
