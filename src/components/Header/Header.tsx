import * as React from 'react';
import Nav from 'react-bootstrap/Nav';

export default function Header(): JSX.Element {
  return (
    <header className="header">
      <Nav className="navbar-expand-lg navbar-light bg-light">
        <Nav.Item>
          <Nav.Link className="navbar-brand" href="#home" data-testid="header-title">TrackingTime</Nav.Link>
        </Nav.Item>
      </Nav>
    </header>
  );
}
