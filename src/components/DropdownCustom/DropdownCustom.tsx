import * as React from 'react';
import { useState } from 'react';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import ProjectForm from 'Components/ProjectForm';
import IProject from 'Entities/project';
import * as AppTypes from 'Entities/types';
import { deleteProject, removeProject } from 'States/project/actions';
import * as StateTypes from 'States/types';

export default function DropdownCustom({ project }: { project: IProject }): JSX.Element {
  const userID: AppTypes.ID = useSelector(
    (state: StateTypes.RootState) => state.user.user.id
  );
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const { id } = project;
  const handleDelete = (projectId: AppTypes.ID, uid: string) => {
    dispatch(deleteProject(projectId));
    dispatch(removeProject(projectId, uid));
  };

  const handleShow = () => {
    setVisible(!isVisible);
  };

  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle bsPrefix="btn" className="custom-toggle" variant="default">
          <span className="three-dots" />
        </Dropdown.Toggle>
        <Dropdown.Menu title="">
          <Dropdown.Item onClick={() => handleShow()}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={() => handleDelete(id, userID)}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <ProjectForm
        isVisible={isVisible}
        onShow={() => handleShow()}
        projectData={project}
      />
    </>
  );
}
