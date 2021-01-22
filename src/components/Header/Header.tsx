import * as React from 'react';
import { Navbar, Row } from 'react-bootstrap';

export default function Header(): JSX.Element {
  return (
    <Row className="header">
      <Navbar className="navbar-expand-lg navbar-light bg-light">
        <Navbar.Brand className="navbar-brand" href="#home" data-testid="header-title">TrackingTime</Navbar.Brand>
      </Navbar>
    </Row>
  );
}
