import * as React from 'react';
import { Navbar } from 'react-bootstrap';

export default function Header(): JSX.Element {
  return (
    <Navbar expand="lg" bg="light">
      <Navbar.Brand className="navbar-brand" href="#home" data-testid="header-title">TrackingTime</Navbar.Brand>
    </Navbar>
  );
}
