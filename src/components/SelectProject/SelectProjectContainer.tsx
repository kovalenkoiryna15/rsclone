import { connect } from 'react-redux';

import * as Types from 'Entities/types';
import * as MyModels from 'Store/types';
import SelectProject from './SelectProject';

type OwnProps = {
  defaultValue?: Types.ID;
  onChange: (
    project: { value: Types.ID, label: string },
    options: { action: string, name: string, option: any },
  ) => void;
};

const mapStateToProps = (state: MyModels.RootState, ownProps: OwnProps) => ({
  defaultValue: ownProps.defaultValue,
  onChange: ownProps.onChange,
  projects: state.projects.projects,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps)(SelectProject);
