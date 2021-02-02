import * as React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Switch, Route, Redirect } from 'react-router-dom';

import * as MyModels from 'Store/types';
import TaskListContainer from 'Components/TaskList/TaskListContainer';
import TaskListNav from 'Components/TaskListNav';
import IProject from 'Entities/project-entities';

export default function MainView(): JSX.Element {
  const allProjects = useSelector((state: MyModels.RootState) => {
    const { projects: { projects } } = state;
    return projects;
  });

  function renderTaskListPages() {
    return allProjects ? (
      Object.values(allProjects).map((project: IProject) => {
        const { id } = project;
        return (
          <Route path={`/rsclone/project/${id}`} key={id}>
            <TaskListContainer id={id} />
          </Route>
        );
      })
    ) : null;
  }

  return (
    <Row className="main-view">
      <TaskListNav />
      <Col className="task-list">
        <Switch>
          <Route exact path="/rsclone/tasks">
            <TaskListContainer id="" />
          </Route>
          {renderTaskListPages()}
          <Redirect to="/rsclone/tasks" />
        </Switch>
      </Col>
    </Row>
  );
}
