import * as React from 'react';
import ITask from 'Entities/task-entities';
import { ITaskState } from 'Store/task/action-types';
import * as MyModels from 'Store/types';
import * as Types from 'Entities/types';

interface ITaskItemProps {
  task: ITask;
  removeTask(id: Types.ID): MyModels.AsyncDispatch<ITaskState, any>,
  toggleCompleteTask(id: Types.ID): MyModels.AsyncDispatch<ITaskState, any>,
}

function TaskItem({
  task: { title, id, isCompleted }, removeTask, toggleCompleteTask,
}: ITaskItemProps): JSX.Element {
  const classes = [
    'list-group-item',
    'list-group-item-action',
    'd-flex',
    'justify-content-between',
    'align-items-center',
  ];

  if (isCompleted) classes.push('completed');

  return (
    <li className={classes.join(' ')}>
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
        onKeyUp={(ev) => {
          if (ev.key === 'Enter') removeTask(id);
        }}
      >
        &times;
      </button>
    </li>
  );
}

export default TaskItem;
