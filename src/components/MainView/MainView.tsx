import * as React from 'react';
import { Row } from 'react-bootstrap';

import TaskListContainer from 'Components/TaskList/TaskListContainer';
import TaskListNav from 'Components/TaskListNav';
import TaskView from 'Components/TaskView';

export default function MainView(): JSX.Element {
  return (
    <Row className="main-view">
      <TaskListNav />
      <TaskListContainer />
      <TaskView />
    </Row>
  );
}
