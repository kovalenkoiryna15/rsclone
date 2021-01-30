import { connect } from 'react-redux';
import { RootState } from 'Store/types';

import TaskList from './TaskList';

const mapStateToProps = (state: RootState) => ({
  isLoading: state.firebase.isLoading,
  tasks: state.tasks.tasks,
});

export default connect(mapStateToProps)(TaskList);
