import { connect } from 'react-redux';

import * as AppTypes from 'Entities/types';
import * as StateTypes from 'States/types';
import SelectProject from './SelectProject';

type OwnProps = {
  defaultValue?: AppTypes.ID;
  onChange: (
    project: { value: AppTypes.ID; label: string },
    options: { action: string; name: string; option: any }
  ) => void;
};

const mapStateToProps = (state: StateTypes.RootState, ownProps: OwnProps) => ({
  defaultValue: ownProps.defaultValue,
  onChange: ownProps.onChange,
  projects: state.projects.projects,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps)(SelectProject);
