import { connect } from 'react-redux';

import { tasksActions } from 'Store/task';
import { taskListActions } from 'Store/task-list';
import * as Types from 'Store/types';
import EditTask from './EditTask';

const mapStateToProps = (state: Types.RootState) => ({
  task: state.taskList.selectedTask,
  isVisible: state.taskList.isVisibleEdit,
  userID: state.user.user.id,
});

const mapDispatchToProps = {
  addTask: tasksActions.add,
  deselectTask: taskListActions.deselectTask,
  hideEdit: taskListActions.hideEdit,
  updateTask: tasksActions.update,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
