import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './DropdownCustom.scss';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { deleteProject } from 'Store/project/actions';
import * as Types from 'Entities/types';
import IProject from 'Entities/project-entities';
import ProjectForm from 'Components/ProjectForm';

export default function DropdownCustom({ project }: { project: IProject }): JSX.Element {
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const { id } = project;
  const handleDelete = (projectId: Types.ID) => {
    dispatch(deleteProject(projectId));
  };

  const handleShow = () => {
    setVisible(!isVisible);
  };

  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle bsPrefix="btn" className="custom-toggle" variant="default"><span className="three-dots" /></Dropdown.Toggle>
        <Dropdown.Menu title="">
          <Dropdown.Item onClick={() => handleShow()}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={() => handleDelete(id)}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <ProjectForm isVisible={isVisible} handleShow={() => handleShow()} projectData={project} />
    </>
  );
}
