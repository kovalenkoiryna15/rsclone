import * as React from 'react';
import { Col } from 'react-bootstrap';
import { Route, Switch, useLocation } from 'react-router';

const TasksView = () => {
  const { pathname } = useLocation();

  return <div>{pathname}</div>;
};

const ProjectView = () => {
  const { pathname } = useLocation();

  return <div>{pathname}</div>;
};

export default function TaskList(): JSX.Element {
  return (
    <Col className="task-list">
      TaskList
      <Switch>
        <Route exact path="/tasks" component={TasksView} />
        <Route path="/projects" component={ProjectView} />
        <Route path="/projects/:id" component={ProjectView} />
      </Switch>
    </Col>
  );
}
