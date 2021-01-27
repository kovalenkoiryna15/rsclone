import * as React from 'react';
import { forwardRef } from 'react';
import './DropdownCustom.scss';
import { ButtonGroup, Dropdown, Button } from 'react-bootstrap';

type TCustomToggleProps = {
  children: any;
  onClick: () => void;
};

function CustomToggleComponent(
  { children, onClick }: TCustomToggleProps, ref: React.ReactNode,
): JSX.Element {
  return (
    <Button
      type="button"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="btn-outline-none custom-dropdown"
    >
      {children}
      <span className="three-dots" />
    </Button>
  );
}

const CustomToggle = forwardRef<TCustomToggleProps, React.ReactNode>(CustomToggleComponent);

const handleEdit = (id: string | number) => {
  console.log('Edit Click', id);
};

const handleDelete = (id: string | number) => {
  console.log('Delete Click', id);
};

export default function DropdownCustom({ id }: { id: string | number }): JSX.Element {
  return (
    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle as={CustomToggle} />
      <Dropdown.Menu title="">
        <Dropdown.Item onClick={(e) => handleEdit(id)}>Edit</Dropdown.Item>
        <Dropdown.Item onClick={(e) => handleDelete(id)}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
