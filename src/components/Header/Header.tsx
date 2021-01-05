import React from 'react';
import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#home" data-testid="header-title">TrackingTime</a>
      </nav>
    </header>
  );
}
