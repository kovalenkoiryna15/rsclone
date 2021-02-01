import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DropdownCustom.scss';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { deleteProject, removeProject } from 'Store/project/actions';
import * as Types from 'Entities/types';
import IProject from 'Entities/project-entities';
import ProjectForm from 'Components/ProjectForm';
import IUser from 'Entities/user-entities';
import { IUserState } from 'Store/user/action-types';
import * as MyModels from 'Store/types';

export default function DropdownCustom({ project }: { project: IProject }): JSX.Element {
  const userID = useSelector((state: MyModels.RootState) => {
    const { user: userState }: { user: IUserState } = state as { user: IUserState};
    const { user }: { user: IUser } = userState as { user: IUser };
    const { id }: { id: string } = user as { id: string };
    return id;
  });
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
        <Dropdown.Toggle bsPrefix="btn" className="custom-toggle" variant="default"><span className="three-dots" /></Dropdown.Toggle>
        <Dropdown.Menu title="">
          <Dropdown.Item onClick={() => handleShow()}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={() => handleDelete(id, userID)}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <ProjectForm isVisible={isVisible} handleShow={() => handleShow()} projectData={project} />
    </>
  );
}
