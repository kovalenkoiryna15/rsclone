import EventIcon from '@material-ui/icons/Event';
import * as React from 'react';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import Calendar from 'Components/Calendar/Calendar';
import SelectProject from 'Components/SelectProject';
import ITask from 'Entities/task-entities';
import * as Types from 'Entities/types';
import { tasksTypes } from 'Store/task';
import * as MyModels from 'Store/types';

const parseStringToTime = (stringTime?: string /* '99:99' */): number | undefined /* min */ => {
  if (!stringTime) return undefined;
  const arr = stringTime.split(':').reverse();
  if (arr.length === 2 && arr.every((v) => !Number.isNaN(+v))) {
    return arr.map((v, i) => +v * 60 ** i).reduce((a, v) => a + v) * 1000;
  }
  return undefined;
};

interface IEditTaskProps {
  task: ITask;
  addTask: (task: Omit<ITask, 'id'>, userID: Types.ID) => MyModels.AsyncDispatch<tasksTypes.TasksState, any>;
  updateTask: (task: ITask) => MyModels.AsyncDispatch<tasksTypes.TasksState, any>;
  handleShow: () => void;
  isVisible: boolean;
  userID: Types.ID,
}

interface IEditTaskState extends Omit<ITask, 'estimatedTime'> {
  estimatedTime: string;
}

type FormState = {
  isValidated: boolean,
  isVisibleDueDateModal: boolean,
};

const EditTask = ({
  userID, task, addTask, updateTask, isVisible, handleShow,
}: IEditTaskProps): JSX.Element => {
  const [taskState, setTaskState] = useState<IEditTaskState>(
    {
      ...task,
      estimatedTime: task.estimatedTime
        ? (new Date(task.estimatedTime)).toTimeString()
        : '00:00',
    },
  );

  const [formState, setFormState] = useState<FormState>({
    isValidated: false,
    isVisibleDueDateModal: false,
  });

  const handleDeadlineChange = (deadline?: number) => {
    setTaskState((prevState) => ({
      ...prevState,
      deadline,
    }));
  };

  const handleProjectChange = (project: Types.ID, action: string) => {
    if (project && action === 'select-option') {
      setTaskState((prevState) => ({
        ...prevState,
        project,
      }));
    }
  };

  const handleShowDueDateModal = () => {
    setFormState((prevState) => ({
      ...prevState,
      isVisibleDueDateModal: !prevState.isVisibleDueDateModal,
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setTaskState((prevState) => {
      const { name, value } = event.target;
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const { currentTarget: form } = event;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    setFormState((prevState) => ({
      ...prevState,
      isValidated: true,
    }));

    if (taskState.id) {
      updateTask({
        ...taskState,
        estimatedTime: parseStringToTime(taskState.estimatedTime),
      });
    } else {
      addTask({
        ...taskState,
        estimatedTime: parseStringToTime(taskState.estimatedTime),
      }, userID);
    }
    handleShow();
  };

  return (
    <>
      <Modal
        animation
        className="task-modal"
        onHide={handleShow}
        show={isVisible}
      >
        <Modal.Header closeButton>
          <Button variant="primary" onClick={handleShowDueDateModal}>
            <EventIcon />
            {taskState.deadline
              ? (new Date(taskState.deadline)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
              : 'Due date'}
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="task-form"
            validated={formState.isValidated}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
          >
            <Form.Group controlId="formTaskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                name="title"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                placeholder="Task Name"
                required
                type="text"
                value={taskState.title}
                minLength={Number(1)}
              />
            </Form.Group>
            <Form.Group controlId="formProject">
              <Form.Label>Project</Form.Label>
              <SelectProject
                defaultValue={taskState.project}
                onChange={handleProjectChange}
              />
            </Form.Group>
            <Form.Group controlId="formProjectEstimatedTime">
              <Form.Label>Estimated Time</Form.Label>
              <Form.Control
                name="estimatedTime"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                type="text"
                value={taskState.estimatedTime}
              />
            </Form.Group>
            <Button variant="link" onClick={handleShow}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={(e: React.MouseEvent<HTMLFormElement>) => handleSubmit(e)}
            >
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Calendar
        dueDate={taskState.deadline}
        setDueDate={handleDeadlineChange}
        handleShow={handleShowDueDateModal}
        isVisible={formState.isVisibleDueDateModal}
      />
    </>
  );
};

export default EditTask;
