import * as React from 'react';
import { Badge } from 'react-bootstrap';

import IProject from 'Entities/project-entities';
import ITask from 'Entities/task-entities';
import * as AppTypes from 'Entities/types';

interface ITaskItemProps {
  task: ITask;
  // eslint-disable-next-line react/require-default-props
  project?: IProject;
  userID: AppTypes.ID;
  removeTask: (task: ITask, userID: AppTypes.ID) => void;
  selectTask: (task: ITask) => void;
  showEdit: () => void;
  updateTask: (task: ITask, userID: AppTypes.ID) => void;
}

function TaskItem({
  task,
  project,
  removeTask,
  updateTask,
  selectTask,
  showEdit,
  userID,
}: ITaskItemProps): JSX.Element {
  const classes = [
    'list-group-item',
    'list-group-item-action',
    'd-flex',
    'justify-content-between',
    'align-items-center',
  ];

  const { title, id, isCompleted } = task;

  if (isCompleted) classes.push('completed');

  const editTask = (
    event:
      | React.MouseEvent<HTMLLIElement, MouseEvent>
      | React.KeyboardEvent<HTMLLIElement>
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (event.target.nodeName === 'LI') {
      event.preventDefault();
      event.stopPropagation();
      selectTask(task);
      showEdit();
    }
  };

  const handleCompleteTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'isCompleted') {
      event.preventDefault();
      event.stopPropagation();
      updateTask(
        {
          ...task,
          isCompleted: !isCompleted,
        },
        userID
      );
    }
  };

  const handleRemoveTask = (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (event.target.name === 'removeTask') {
      event.preventDefault();
      event.stopPropagation();
      removeTask(task, userID);
    }
  };

  return (
    <li
      className={classes.join(' ')}
      onClick={(e) => editTask(e)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') editTask(e);
      }}
      role="presentation"
    >
      <div className="custom-control custom-checkbox">
        <input
          checked={isCompleted}
          className="custom-control-input"
          id={`customCheck${id}`}
          name="isCompleted"
          onChange={(e) => handleCompleteTask(e)}
          type="checkbox"
        />
        <label className="custom-control-label" htmlFor={`customCheck${id}`}>
          {title}
        </label>
        {project ? (
          <Badge
            className="ml-2"
            style={{ backgroundColor: project.color }}
            variant="secondary"
          >
            {project.title}
          </Badge>
        ) : null}
      </div>
      <div className="d-inline-flex justify-content-end m-sm-1">
        {task.deadline ? (
          <Badge
            className="mr-2"
            variant={task.deadline < Date.now() ? 'warning' : 'dark'}
          >
            {new Date(task.deadline).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </Badge>
        ) : null}
        <button
          className="btn btn-outline-danger btn-sm"
          name="removeTask"
          onClick={(e) => handleRemoveTask(e)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') handleRemoveTask(e);
          }}
          type="button"
        >
          &times;
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
