/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import './MainView.scss';

import TaskView from '../TaskView/TaskView';
import TaskListNav from '../TaskListNav/TaskListNav';
import TaskList from '../TaskList/TaskList';

export default function MainView() {
  return (
    <main className="main row">
      <TaskListNav />
      <TaskList />
      <TaskView />
    </main>
  );
}
