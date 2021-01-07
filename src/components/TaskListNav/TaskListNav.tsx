import React from 'react';
import Nav from 'react-bootstrap/Nav';

export default function TaskListNav() {
  return (
    <div className="task-list-nav col-3">
      <Nav className="flex-column bg-light">
        <Nav.Item>
          <Nav.Link href="#all-tasks">Tasks</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#projects-tasks">Projects</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#no-project">no project</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#project/id">Project A</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}
