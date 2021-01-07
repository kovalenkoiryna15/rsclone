import React from 'react';
import './MainView.scss';

import TaskView from '../TaskView';
import TaskListNav from '../TaskListNav';
import TaskList from '../TaskList';

export default function MainView() {
  return (
    <main className="main-view row">
      <TaskListNav />
      <TaskList />
      <TaskView />
    </main>
  );
}
