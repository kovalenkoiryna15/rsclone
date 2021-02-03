import * as React from 'react';
import { Button, Col, Nav } from 'react-bootstrap';

import TaskItem from 'Components/TaskItem';
import EditTask from 'Components/EditTask';
import ITask from 'Entities/task-entities';

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
  const addNewTask = () => {
    deselectTask();
    showEdit();
  };

  return (
    <Col className="task-list">
      <Nav className="justify-content-end p-1" activeKey="/home">
        <Nav.Item>
          <Button onClick={addNewTask} className="text-uppercase text-nowrap">
            + Task
          </Button>
        </Nav.Item>
      </Nav>
      {
        tasks.length
          ? (
            <ul className="list-group">
              {
                id
                  ? tasks.filter((task) => task.project === id).map((task) => (
                    <TaskItem
                      task={task}
                      key={task.id.toString()}
                    />
                  ))
                  : tasks.map((task) => (
                    <TaskItem
                      task={task}
                      key={task.id.toString()}
                    />
                  ))
              }
            </ul>
          )
          : !isLoading && <p>No tasks!</p>
      }
      {isVisibleEdit ? <EditTask /> : <></>}
    </Col>
  );
};

export default TaskList;
