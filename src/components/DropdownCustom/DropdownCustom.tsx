import * as React from 'react';
import './DropdownCustom.scss';
import Dropdown from 'react-bootstrap/Dropdown';

const CustomToggle = React.forwardRef(({ children, onClick }: any, ref: any) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <span className="three-dots" />
  </a>
));

const handleEdit = (id: string | number) => {
  console.log('Edit Click', id);
};

const handleDelete = (id: string | number) => {
  console.log('Delete Click', id);
};

export default function DropdownCustom({ id }: { id: string | number }): JSX.Element {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} />
      <Dropdown.Menu size="xs" title="">
        <Dropdown.Item onClick={() => handleEdit(id)}>Edit</Dropdown.Item>
        <Dropdown.Item onClick={() => handleDelete(id)}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
