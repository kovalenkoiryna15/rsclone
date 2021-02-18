import * as React from 'react';
import { useState } from 'react';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import ProjectForm from 'Components/ProjectForm';
import IProject from 'Entities/project-entities';
import * as Types from 'Entities/types';
import { deleteProject, removeProject } from 'Store/project/actions';
import * as MyModels from 'Store/types';

export default function DropdownCustom({ project }: { project: IProject }): JSX.Element {
  const userID: Types.ID = useSelector((state: MyModels.RootState) => state.user.user.id);
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const { id } = project;
  const handleDelete = (projectId: Types.ID, uid: string) => {
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
