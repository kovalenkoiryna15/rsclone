import { connect } from 'react-redux';

import { taskActions } from 'State/task';
import { taskListActions } from 'State/task-list';
import * as StateTypes from 'State/types';
import EditTask from './EditTask';

const mapStateToProps = (state: StateTypes.RootState) => ({
  task: state.taskList.selectedTask,
  isVisible: state.taskList.isVisibleEdit,
  userID: state.user.user.id,
});

const mapDispatchToProps = {
  addTask: taskActions.add,
  deselectTask: taskListActions.deselectTask,
  hideEdit: taskListActions.hideEdit,
  updateTask: taskActions.update,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
