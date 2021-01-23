import { connect } from 'react-redux';
import { RootReducer } from 'Store/types';

import TaskList from './TaskList';

const mapStateToProps = (state: RootReducer) => ({
  isLoading: state.firebase.isLoading,
  tasks: state.tasks.tasks,
});

export default connect(mapStateToProps)(TaskList);
