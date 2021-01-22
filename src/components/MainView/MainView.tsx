import * as React from 'react';
import { Row } from 'react-bootstrap';

import TaskList from 'Components/TaskList';
import TaskListNav from 'Components/TaskListNav';
import TaskView from 'Components/TaskView';

export default function MainView(): JSX.Element {
  return (
    <Row className="main-view">
      <TaskListNav />
      <TaskList />
      <TaskView />
    </Row>
  );
}
