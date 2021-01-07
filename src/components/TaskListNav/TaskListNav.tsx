import React from 'react';

export default function TaskListNav() {
  return (
    <div className="task-list-nav col-3">
      <nav className="nav flex-column bg-light">
        <a className="nav-link active" href="#all-tasks">Tasks</a>
        <div className="nav-link">Projects</div>
        <a className="nav-link" href="#no-project">no project</a>
        <a className="nav-link" href="#project/id">Project A</a>
      </nav>
    </div>
  );
}
