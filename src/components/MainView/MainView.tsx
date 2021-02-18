import * as React from 'react';
import { useSelector } from 'react-redux';
import { Row, Spinner } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import * as MyModels from 'Store/types';
import TaskList from 'Components/TaskList';
import TaskListNav from 'Components/TaskListNav';
import IProject from 'Entities/project-entities';

interface IMainViewProps {
  isLoading: boolean;
  isAuth: boolean;
}

const MainView = ({ isLoading, isAuth }: IMainViewProps): JSX.Element => {
  const allProjects = useSelector((state: MyModels.RootState) => {
    const {
      projects: { projects },
    } = state;
    return projects;
  });

  function renderTaskListPages() {
    return allProjects
      ? Object.values(allProjects).map((project: IProject) => {
          const { id } = project;
          return (
            <Route key={id} path={`/rsclone/project/${id}`}>
              <TaskList id={id} />
            </Route>
          );
        })
      : null;
  }

  return (
    <Router>
      <Row className="main-view">
        <TaskListNav />
        {isAuth && isLoading ? (
          <Spinner
            animation="border"
            className="d-flex align-items-center m-2 justify-content-around text-primary"
            variant="info"
          />
        ) : (
          <Switch>
            <Route exact path="/rsclone/tasks">
              <TaskList id="" />
            </Route>
            {renderTaskListPages()}
            <Redirect to="/rsclone/tasks" />
          </Switch>
        )}
      </Row>
    </Router>
  );
};

export default MainView;
