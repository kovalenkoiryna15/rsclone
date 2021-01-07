import React from 'react';
import { Col, Nav } from 'react-bootstrap';

export default function TaskListNav() {
  return (
    <Col className="task-list-nav" xs={3}>
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
    </Col>
  );
}
