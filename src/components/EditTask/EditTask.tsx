import Calendar from 'Components/Calendar/Calendar';
import { useState } from 'react';
import * as React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import EventIcon from '@material-ui/icons/Event';

import ITask from 'Entities/task-entities';
import { tasksTypes } from 'Store/task';
import * as MyModels from 'Store/types';

interface IEditTaskProps {
  task: ITask;
  addTask: (task: Omit<ITask, 'id'>) => MyModels.AsyncDispatch<tasksTypes.TasksState, any>;
  updateTask: (task: ITask) => MyModels.AsyncDispatch<tasksTypes.TasksState, any>;
  handleShow: () => void;
  isVisible: boolean;
}

type EditTaskState = {
  task: ITask,
  dueDate?: number,
  isValidated: boolean,
  isVisibleDueDateModal: boolean,
};

const EditTask = ({
  task, addTask, updateTask, isVisible, handleShow,
}: IEditTaskProps): JSX.Element => {
  const [state, setState] = useState<EditTaskState>(
    {
      task,
      dueDate: task.deadline,
      isValidated: false,
      isVisibleDueDateModal: false,
    },
  );
  const { isValidated, dueDate, isVisibleDueDateModal } = state;

  const handleDueDateChange = (newDueDate?: number) => {
    setState((prevState) => ({
      ...prevState,
      dueDate: newDueDate,
    }));
  };

  const handleShowDueDateModal = () => {
    setState((prevState) => ({
      ...prevState,
      isVisibleDueDateModal: !isVisibleDueDateModal,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const { currentTarget: form } = event;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    setState((prevState) => ({
      ...prevState,
      isValidated: true,
    }));

    const { task: newTask } = state;
    const { id } = newTask;

    if (id) {
      updateTask({ ...newTask, id });
    } else {
      addTask(newTask);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setState((prevState) => {
      const { name, value } = event.target;
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const { title } = task;

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
            Due date
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="task-form"
            validated={isValidated}
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
                value={title}
              />
            </Form.Group>
            <Button
              variant="secondary"
              onClick={handleShow}
            >
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
        dueDate={dueDate}
        setDueDate={handleDueDateChange}
        handleShow={handleShowDueDateModal}
        isVisible={isVisibleDueDateModal}
      />
    </>
  );
};

export default EditTask;
