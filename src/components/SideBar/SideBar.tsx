import * as React from 'react';
import { Button } from 'react-bootstrap';

export default function SideBar({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [collapseStatus, setStatus] = React.useState(false);
  const classes = `sidebar ${
    !collapseStatus ? 'sidebar-uncollapsed' : 'sidebar-collapsed mr-0'
  }`;
  const icon = !collapseStatus ? 'keyboard_arrow_left' : 'keyboard_arrow_right';

  return (
    <div className={classes}>
      <Button
        className="sidebar-btn rounded-circle p-0"
        onClick={() => setStatus(!collapseStatus)}
        size="sm"
        variant="light"
      >
        <i className="material-icons md-dark">{icon}</i>
      </Button>
      {!collapseStatus ? children : null}
    </div>
  );
}
