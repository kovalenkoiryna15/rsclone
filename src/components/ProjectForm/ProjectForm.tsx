import * as React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import IProject from 'Entities/project-entities';

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
  writeProject: (newProject: IProject, uid: string) => void;
  userID: string;
}

interface IProjectFormState extends Omit<IProject, 'deadline' | 'estimatedTime'> {
  deadline?: string;
  estimatedTime?: string;
  validated: boolean;
  userID: string;
  isValid: boolean;
}

const initialState: IProjectFormState = {
  id: '',
  title: '',
  color: '#2aa198',
  deadline: '',
  estimatedTime: '00:00',
  validated: false,
  userID: '',
  isValid: false,
};

class ProjectForm extends React.Component<IProjectFormProps, IProjectFormState> {
  constructor(props: IProjectFormProps) {
    super(props);
    const { projectData, userID } = props;
    if (projectData) {
      const { deadline, estimatedTime } = projectData;
      this.state = {
        ...projectData,
        validated: false,
        deadline: deadline ? new Date(deadline).toISOString().substring(0, 10) : '',
        estimatedTime: estimatedTime ? parseToTime(estimatedTime) : '',
        userID,
        isValid: true,
      };
    } else {
      this.state = {
        ...initialState,
        userID,
      };
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState((prevState) => ({
      ...prevState,
      validated: true,
    }));

    const {
      id, title, deadline, estimatedTime, color,
    } = this.state;

    const newProject = {
      id,
      title: String(title).trim(),
      deadline: deadline ? new Date(deadline) : null,
      estimatedTime: estimatedTime ? parseToNumberOfMS(estimatedTime) : null,
      color,
    };

    const {
      addProject, writeProject, updateProject, userID,
    } = this.props;
    if (id) {
      updateProject(newProject);
      writeProject(newProject, userID);
    } else {
      const createdID = Date.now().toString();
      this.setState((state) => ({
        ...state,
        id: createdID,
      }));
      newProject.id = createdID;
      addProject(newProject);
      writeProject(newProject, userID);
    }
  };

  handleClose(event: React.MouseEvent<HTMLElement>): void {
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

  handleTitleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    event.persist();
    this.setState((state) => {
      const { name, value } = event.target;
      if (/\S/.exec(value) && !/^$/.exec(value)) {
        return {
          ...state,
          [name]: value,
          isValid: true,
        };
      }
      return {
        ...state,
        [name]: '',
        isValid: false,
      };
    });
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    event.persist();
    this.setState((state) => {
      const { name, value } = event.target;
      return {
        ...state,
        [name]: value,
      };
    });
  }

  render(): JSX.Element {
    const {
      title,
      deadline,
      estimatedTime,
      color,
      validated,
      isValid,
    } = this.state;
    const { isVisible } = this.props;
    return (
      <Modal
        className="project-modal"
        onHide={(e: React.MouseEvent<HTMLElement>) => this.handleClose(e)}
        show={isVisible}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="project-form"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.handleSubmit(e)}
            validated={validated}
          >
            <Form.Group controlId="formProjectName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                maxLength={Number(40)}
                minLength={Number(1)}
                name="title"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleTitleChange(e)}
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
              onClick={(e: React.MouseEvent<HTMLElement>) => this.handleClose(e)}
              variant="secondary"
            >
              Close
            </Button>
            <Button
              disabled={!isValid}
              onClick={(e: React.MouseEvent<HTMLFormElement>) => this.handleSubmit(e)}
              type="submit"
              variant="primary"
            >
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ProjectForm;
