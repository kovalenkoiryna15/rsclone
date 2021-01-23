import * as React from 'react';
import { Col } from 'react-bootstrap';
import { Route, Switch, useLocation } from 'react-router';

import ITask from 'Entities/task-entities';
import TaskItemContainer from 'Components/TaskItem/TaskItemContainer';

const TasksView = () => {
  const { pathname } = useLocation();

  return <div>{pathname}</div>;
};

const ProjectView = () => {
  const { pathname } = useLocation();

  return <div>{pathname}</div>;
};

interface ITaskListProps {
  tasks: Array<ITask>;
  isLoading: boolean;
}

const TaskList = ({ tasks, isLoading }: ITaskListProps): JSX.Element => (
  <Col className="task-list">
    {
        tasks.length
          ? (
            <ul className="list-group">
              {tasks.map((task) => (
                <TaskItemContainer
                  task={task}
                  key={task.id.toString()}
                />
              ))}
            </ul>
          )
          : !isLoading && <p>No tasks!</p>
    }
    <Switch>
      <Route exact path="/tasks" component={TasksView} />
      <Route path="/projects" component={ProjectView} />
      <Route path="/projects/:id" component={ProjectView} />
    </Switch>
  </Col>

);

export default TaskList;
