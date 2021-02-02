import { connect } from 'react-redux';

import * as Types from 'Entities/types';
import * as MyModels from 'Store/types';
import SelectProject from './SelectProject';

type OwnProps = {
  onChange: (value: string, action: string) => void;
  defaultValue?: Types.ID;
};

const mapStateToProps = (state: MyModels.RootState, ownProps: OwnProps) => ({
  projects: state.projects.projects,
  onChange: ownProps.onChange,
  defaultValue: ownProps.defaultValue,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps)(SelectProject);
