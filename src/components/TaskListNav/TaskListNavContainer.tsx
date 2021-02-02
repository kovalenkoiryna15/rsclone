import { connect } from 'react-redux';
import * as MyModels from 'Store/types';

import TaskListNav from './TaskListNav';

function mapStateToProps(state: MyModels.RootState) {
  const { projects: { projects, isLoading, error } } = state;
  return { projects, isLoading, error };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps)(TaskListNav);
