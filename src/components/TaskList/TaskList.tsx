import * as React from 'react';
import { useState } from 'react';
import { Button, Col, Nav } from 'react-bootstrap';

import TaskItem from 'Components/TaskItem';
import TaskView from 'Components/TaskView';
import ITask from 'Entities/task-entities';

interface ITaskListProps {
  tasks: Array<ITask>;
  isLoading: boolean;
  id: string;
}

const defaultTask: ITask = {
  id: '',
  title: '',
  isCompleted: false,
};

const TaskList = ({ tasks, isLoading, id }: ITaskListProps): JSX.Element => {
  const [isVisibleTaskView, setVisibleTaskView] = useState(false);
  const [openedTask, setOpenedTask] = useState(defaultTask);

  const handleShow = () => {
    setVisibleTaskView(!isVisibleTaskView);
  };

  return (
    <Col className="task-list">
      <Nav className="justify-content-end" activeKey="/home">
        <Nav.Item>
          <Button onClick={handleShow} className="text-uppercase text-nowrap">
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
      <TaskView
        task={openedTask}
        isVisible={isVisibleTaskView}
        handleShow={handleShow}
      />
    </Col>
  );
};

export default TaskList;
