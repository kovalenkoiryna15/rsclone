import * as React from 'react';

import TaskView from 'Components/TaskView';
import TaskListNav from 'Components/TaskListNav';
import TaskList from 'Components/TaskList';

export default function MainView(): JSX.Element {
  return (
    <div className="main-view">
      <TaskListNav />
      <TaskList />
      <TaskView />
    </div>
  );
}
