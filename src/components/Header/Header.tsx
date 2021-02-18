import * as React from 'react';
import { Navbar, Row, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from 'Store/user/actions';

export default function Header(): JSX.Element {
  const dispatch = useDispatch();

  const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(logout());
  };

  return (
    <Row className="header">
      <Navbar className="navbar-expand-lg navbar-light bg-light justify-content-between">
        <Navbar.Brand
          className="navbar-brand"
          data-testid="header-title"
          href="https://kovalenkoiryna15.github.io/rsclone/"
        >
          RSClone Tracking Time
        </Navbar.Brand>
        <Button
          className="text-uppercase"
          onClick={handleLogout}
          type="button"
          variant="primary"
        >
          Logout
        </Button>
      </Navbar>
    </Row>
  );
}
