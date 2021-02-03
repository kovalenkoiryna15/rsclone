import * as React from 'react';
import ITask from 'Entities/task-entities';
import { TasksState } from 'Store/task/action-types';
import * as MyModels from 'Store/types';
import * as Types from 'Entities/types';

interface ITaskItemProps {
  task: ITask;
  removeTask: (id: Types.ID) => void;
  selectTask: (task: ITask) => void,
  showEdit: () => void,
  toggleCompleteTask: (id: Types.ID) => void;
}

function TaskItem({
  task, removeTask, toggleCompleteTask, selectTask, showEdit,
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

  const editTask = () => {
    selectTask(task);
    showEdit();
  };

  return (
    <li
      className={classes.join(' ')}
      onClick={editTask}
      onKeyDown={(e) => {
        if (e.key === 'Enter') editTask();
      }}
      role="presentation"
    >
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          checked={isCompleted}
          onChange={() => toggleCompleteTask(id)}
          id={`customCheck${id}`}
        />
        <label className="custom-control-label" htmlFor={`customCheck${id}`}>{title}</label>
      </div>
      <button
        type="button"
        className="btn btn-outline-danger btn-sm"
        onClick={() => removeTask(id)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') removeTask(id);
        }}
      >
        &times;
      </button>
    </li>
  );
}

export default TaskItem;
