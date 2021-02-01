import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import * as MyModels from 'Store/types';
import TaskList from 'Components/TaskList';
import TaskListNav from 'Components/TaskListNav';
import TaskView from 'Components/TaskView';
import IProject from 'Entities/project-entities';
import ITask from 'Entities/task-entities';

export default function MainView(): JSX.Element {
  const [isVisibleTaskView, setVisibleTaskView] = useState(false);
  const newTask: ITask = {
    id: '',
    title: '',
    isCompleted: false,
  };
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

    <Router>
      <Row className="main-view">
        <TaskListNav />
        <Col className="task-list">
          <Switch>
            <Route exact path="/rsclone/tasks">
              <TaskList id="" />
            </Route>
            {renderTaskListPages()}
            <Redirect to="/rsclone/tasks" />
          </Switch>
        </Col>
        <TaskView
          task={newTask}
          isVisible={isVisibleTaskView}
          handleShow={() => setVisibleTaskView(!isVisibleTaskView)}
        />
      </Row>
    </Router>
  );
}
