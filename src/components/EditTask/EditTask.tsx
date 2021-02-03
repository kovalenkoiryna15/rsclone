import EventIcon from '@material-ui/icons/Event';
import * as React from 'react';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import Calendar from 'Components/Calendar/Calendar';
import SelectProject from 'Components/SelectProject';
import ITask from 'Entities/task-entities';
import * as Types from 'Entities/types';

const parseHHmmStringToMin = (HHmm?: string /* 'HH:mm' */): number /* ms */ => {
  if (!HHmm) return 0;
  const arr = HHmm.split(':').reverse();
  let minutes;
  if (arr.length <= 2 && arr.every((v) => !Number.isNaN(+v))) {
    minutes = arr.map((v, i) => +v * 60 ** i).reduce((a, v) => a + v);
  }
  return minutes || 0;
};

const addLeadingZero = (n: number): string => `${n < 10 ? '0' : ''}${n}`;

const parseMinutesToHHmm = (minutes?: number /* min */): string /* HH:mm */ => {
  if (!minutes) return '00:00';
  return `${addLeadingZero(Math.floor(minutes / 60))}:${addLeadingZero(minutes % 60)}`;
};

interface IEditTaskProps {
  // eslint-disable-next-line react/require-default-props
  task?: ITask;
  isVisible: boolean;
  userID: Types.ID;
  addTask: (task: Omit<ITask, 'id'>, userID: Types.ID) => void;
  deselectTask: () => void;
  hideEdit: () => void;
  updateTask: (task: ITask, userID: Types.ID) => void;
}

interface IEditTaskState extends Omit<ITask, 'estimatedTime'> {
  estimatedTime: string;
}

type FormState = {
  isValidated: boolean,
  isVisibleDueDateModal: boolean,
};

const defaultTask: ITask = {
  id: '',
  title: '',
  isCompleted: false,
};

const EditTask = ({
  userID, task, addTask, updateTask, isVisible, hideEdit, deselectTask,
}: IEditTaskProps): JSX.Element => {
  const [taskState, setTaskState] = useState<IEditTaskState>(
    {
      ...(task || defaultTask),
      estimatedTime: task
        ? parseMinutesToHHmm(task.estimatedTime)
        : '00:00',
    },
  );

  const [formState, setFormState] = useState<FormState>({
    isValidated: false,
    isVisibleDueDateModal: false,
  });

  const onHide = () => {
    deselectTask();
    hideEdit();
  };

  const handleDeadlineChange = (deadline?: number) => {
    setTaskState((prevState) => ({
      ...prevState,
      deadline,
    }));
  };

  const handleProjectChange = (
    project: {value: Types.ID, label: string},
    options: { action: string, name: string, option: any },
  ) => {
    if (project && options.action === 'select-option') {
      setTaskState((prevState) => ({
        ...prevState,
        project: project.value,
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
        estimatedTime: parseHHmmStringToMin(taskState.estimatedTime),
      }, userID);
    } else {
      delete taskState.id;
      addTask({
        ...taskState,
        estimatedTime: parseHHmmStringToMin(taskState.estimatedTime),
      }, userID);
    }
    onHide();
  };

  return (
    <>
      <Modal
        animation
        className="task-modal"
        onHide={onHide}
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
            <Button variant="link" onClick={onHide}>
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
