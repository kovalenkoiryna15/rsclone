import { connect } from 'react-redux';

import { taskListActions } from 'State/task-list';
import * as Types from 'State/types';
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
