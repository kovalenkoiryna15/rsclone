import IProject from 'Entities/project-entities';
import IProjects from 'Entities/projects-entity';
import * as React from 'react';
import Select from 'react-select';

import * as Types from 'Entities/types';

interface ISelectProjectProps {
  projects: IProjects<IProject>;
  onChange: (value: any, action: any) => void;
  // eslint-disable-next-line react/require-default-props
  defaultValue?: Types.ID;
}

type Option = {
  value: string,
  label: string,
};

const SelectProject = ({ projects, onChange, defaultValue }: ISelectProjectProps): JSX.Element => {
  const customOptions: Array<Option> = [
    {
      value: '',
      label: 'No project',
    },
    ...Object.values(projects).map(({ id, title }) => ({ value: id, label: title })),
  ];

  const filterOptions = (candidate: Option, input: string) => {
    if (input) {
      return candidate.value === customOptions[0].value;
    }
    return true;
  };

  return (
    <Select
      id="formProject"
      className="basic-single"
      classNamePrefix="select"
      defaultValue={
        defaultValue
          ? customOptions.find(({ value }) => value === defaultValue)
          : customOptions[0]
      }
      filterOption={filterOptions}
      isClearable={false}
      isSearchable
      name="project"
      options={customOptions}
      onChange={onChange}
    />
  );
};

export default SelectProject;