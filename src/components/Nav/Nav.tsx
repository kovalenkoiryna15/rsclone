import * as React from 'react';

import './Nav.scss';

export default function TaskListNav() {
  return (
    <div className="aside-nav col-3">
      <nav className="nav flex-column bg-light">
        <a className="nav-link active" href="#all-tasks">Tasks</a>
        <div className="nav-link">Projects</div>
        <a className="nav-link" href="#no-project">no project</a>
        <a className="nav-link" href="#project/id">Project A</a>
      </nav>
    </div>
  );
}
