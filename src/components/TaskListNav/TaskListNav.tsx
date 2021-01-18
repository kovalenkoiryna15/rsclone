import * as React from 'react';
import { Col, Nav} from 'react-bootstrap';
import SideBar from "Components/SideBar";

export default function TaskListNav(): JSX.Element {
  return (
      <SideBar>
        <Col className="task-list-nav">
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
      </SideBar>
  );
}
