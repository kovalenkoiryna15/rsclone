import * as React from 'react';
import Row from 'react-bootstrap/Row';

import TaskView from 'Components/TaskView';
import TaskListNav from 'Components/TaskListNav';
import TaskList from 'Components/TaskList';

export default function MainView() {
  return (
    <Row className="main-view">
      <TaskListNav />
      <TaskList />
      <TaskView />
    </Row>
  );
}
