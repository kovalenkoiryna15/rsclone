import * as React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import IProject, { ProjectView } from 'Entities/project-entities';
import * as Types from 'Entities/types';
import { addProject, updateProject } from 'Store/project/actions';

const MILLISECONDS_IN_HOUR = 3.6E6;
const MILLISECONDS_IN_MINUTE = 60E3;

const addLeadingZero = (value: number): string => `${value < 10 ? '0' : ''}${value}`;

function parseToNumberOfMS(/* hh:mm */ time: string) {
  const hours = time.split(':')[0];
  const minutes = time.split(':')[1];
  return Number(hours) * MILLISECONDS_IN_HOUR + Number(minutes) * MILLISECONDS_IN_MINUTE;
}

function parseToTime(/* ms */ time: number) {
  const hours = Math.trunc(time / MILLISECONDS_IN_HOUR);
  const minutes = Math.trunc((time - hours * MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE);
  return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}`;
}

interface IProjectFormProps {
  projectData?: IProject;
  isVisible: boolean;
  handleShow: (event: React.MouseEvent<HTMLElement>) => void;
  addProject: (newProject: IProject) => void;
  updateProject: (newProject: IProject) => void;
}

interface IProjectFormState extends Omit<IProject, 'deadline' | 'estimatedTime'> {
  deadline?: string;
  estimatedTime?: string;
  validated: boolean;
}

const initialState: Readonly<IProjectFormState> = {
  id: '',
  title: '',
  color: '#000000',
  deadline: '',
  estimatedTime: '00:00',
  validated: false,
};

class ProjectForm extends React.Component<IProjectFormProps, IProjectFormState> {
  constructor(props: IProjectFormProps) {
    super(props);
    const { projectData } = props;
    if (projectData) {
      const { deadline, estimatedTime } = projectData;
      this.state = {
        ...projectData,
        validated: false,
        deadline: deadline ? new Date(deadline).toISOString().substring(0, 10) : '',
        estimatedTime: estimatedTime ? parseToTime(estimatedTime) : '',
      };
    } else {
      this.state = initialState;
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
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
      id,
      title,
      deadline: deadline ? new Date(deadline) : undefined,
      estimatedTime: estimatedTime ? parseToNumberOfMS(estimatedTime) : undefined,
      color,
    };
    if (id) {
      this.props.updateProject(newProject);
    } else {
      const createdID = Date.now().toString();
      this.setState((state) => ({
        ...state,
        id: createdID,
      }));
      newProject.id = createdID;
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
        ...initialState,
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
      title,
      deadline,
      estimatedTime,
      color,
      validated,
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
                placeholder="Title"
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
            <Button
              variant="secondary"
              onClick={(e: React.MouseEvent<HTMLElement>) => this.handleClose(e)}
            >
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
