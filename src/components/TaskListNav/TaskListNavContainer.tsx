import { connect } from 'react-redux';
import * as StateTypes from 'State/types';

import TaskListNav from './TaskListNav';

function mapStateToProps(state: StateTypes.RootState) {
  const {
    projects: { projects, isLoading, error },
  } = state;
  return { projects, isLoading, error };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps)(TaskListNav);
