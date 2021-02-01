import * as React from 'react';

import ITask from 'Entities/task-entities';
import TaskItemContainer from 'Components/TaskItem/TaskItemContainer';

interface ITaskListProps {
  tasks: Array<ITask>;
  isLoading: boolean;
  id: string;
}

const TaskList = ({ tasks, isLoading, id }: ITaskListProps): JSX.Element => (
  <>
    {
      tasks.length
        ? (
          <ul className="list-group">
            {
              id
                ? tasks.filter((task) => task.project === id).map((task) => (
                  <TaskItemContainer
                    task={task}
                    key={task.id.toString()}
                  />
                ))
                : tasks.map((task) => (
                  <TaskItemContainer
                    task={task}
                    key={task.id.toString()}
                  />
                ))
            }
          </ul>
        )
        : !isLoading && <p>No tasks!</p>
    }
  </>
);

export default TaskList;
