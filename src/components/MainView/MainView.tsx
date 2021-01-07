/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import Row from 'react-bootstrap/Row';

import TaskView from '../TaskView';
import TaskListNav from '../TaskListNav';
import TaskList from '../TaskList';

export default function MainView() {
  return (
    <Row className="main-view">
      <TaskListNav />
      <TaskList />
      <TaskView />
    </Row>
  );
}
