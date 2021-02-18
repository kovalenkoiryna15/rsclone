import * as React from 'react';
import { Button, Col, Nav } from 'react-bootstrap';

import TaskItem from 'Components/TaskItem';
import EditTask from 'Components/EditTask';
import ITask from 'Entities/task';

interface ITaskListProps {
  isLoading: boolean;
  isVisibleEdit: boolean;
  tasks: Array<ITask>;
  deselectTask: () => void;
  showEdit: () => void;
  id: string;
}

const TaskList = ({
  isLoading,
  isVisibleEdit,
  tasks,
  deselectTask,
  showEdit,
  id,
}: ITaskListProps): JSX.Element => {
  const handleEditTask = () => {
    deselectTask();
    showEdit();
  };

  return (
    <Col className="task-list">
      <Nav activeKey="/home" className="justify-content-end p-1">
        <Nav.Item>
          <Button className="text-uppercase text-nowrap" onClick={handleEditTask}>
            + Task
          </Button>
        </Nav.Item>
      </Nav>
      {tasks.length ? (
        <ul className="list-group">
          {id
            ? tasks
                .filter((task) => task.project === id)
                .map((task) => <TaskItem key={task.id.toString()} task={task} />)
            : tasks.map((task) => <TaskItem key={task.id.toString()} task={task} />)}
        </ul>
      ) : (
        !isLoading && <p>No tasks!</p>
      )}
      {isVisibleEdit ? <EditTask /> : null}
    </Col>
  );
};

export default TaskList;
