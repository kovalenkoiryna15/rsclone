import { connect } from 'react-redux';

import { taskListActions } from 'Store/task-list';
import * as Types from 'Store/types';
import TaskList from './TaskList';

const mapStateToProps = (state: Types.RootState) => ({
  isLoading: state.firebase.isLoading,
  isVisibleEdit: state.taskList.isVisibleEdit,
  tasks: state.tasks.tasks,
});

const mapDispatchToProps = {
  deselectTask: taskListActions.deselectTask,
  showEdit: taskListActions.showEdit,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
