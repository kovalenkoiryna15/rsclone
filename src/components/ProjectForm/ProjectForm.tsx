import * as React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import IProject from 'Entities/project-entities';
import { addProject, updateProject, writeProject } from 'Store/project/actions';
import IUser from 'Entities/user-entities';
import { IUserState } from 'Store/user/action-types';
import * as MyModels from 'Store/types';

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
        isValid: false,
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
      title: String(title).trim(),
      deadline: deadline ? new Date(deadline) : null,
      estimatedTime: estimatedTime ? parseToNumberOfMS(estimatedTime) : null,
      color,
    };
    const {
      updateProject: updateCurrentProject,
      writeProject: writeNewProject,
      addProject: addNewProject,
      userID: uid,
    } = this.props;
    if (id) {
      updateCurrentProject(newProject);
      writeNewProject(newProject, uid);
    } else {
      const createdID = Date.now().toString();
      this.setState((state) => ({
        ...state,
        id: createdID,
      }));
      newProject.id = createdID;
      addNewProject(newProject);
      writeNewProject(newProject, uid);
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

  handleTitleChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    event.persist();
    this.setState((state) => {
      const { name, value } = event.target;
      if (/\S/.exec(value)) {
        return {
          ...state,
          [name]: value,
          isValid: true,
        };
      }
      return {
        ...state,
        [name]: '',
      };
    });
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
      isValid,
    } = this.state;
    const { isVisible } = this.props;
    return (
      <Modal
        show={isVisible}
        onHide={(e: React.MouseEvent<HTMLElement>) => this.handleClose(e)}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleTitleChange(e)}
                placeholder="Title"
                required
                type="text"
                value={title}
                minLength={Number(1)}
                maxLength={Number(40)}
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
              disabled={!isValid}
            >
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state: MyModels.RootState) => {
  const { user: userState }: { user: IUserState } = state as { user: IUserState};
  const { user }: { user: IUser } = userState as { user: IUser };
  const { id: userID }: { id: string } = user as { id: string };
  return { userID };
};

const mapDispatchToProps = {
  addProject,
  updateProject,
  writeProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
