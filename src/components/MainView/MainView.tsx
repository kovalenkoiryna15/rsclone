import * as React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

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
          <Route path={`/projects/${id}`} key={id}>
            <TaskListContainer id={id} />
          </Route>
        );
      })
    ) : null;
  }

  return (
    <Row className="main-view">
      <BrowserRouter>
        <TaskListNav />
        <Col className="task-list">
          <Switch>
            <Route exact path="/">
              <TaskListContainer id="" />
            </Route>
            {renderTaskListPages()}
          </Switch>
        </Col>
      </BrowserRouter>
    </Row>
  );
}
