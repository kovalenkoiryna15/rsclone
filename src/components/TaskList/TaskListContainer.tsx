import { connect } from 'react-redux';

import { taskListActions } from 'States/task-list';
import * as StateTypes from 'States/types';
import TaskList from './TaskList';

const mapStateToProps = (state: StateTypes.RootState) => ({
  isLoading: state.firebase.isLoading,
  isVisibleEdit: state.taskList.isVisibleEdit,
  tasks: state.tasks.tasks,
});

const mapDispatchToProps = {
  deselectTask: taskListActions.deselectTask,
  showEdit: taskListActions.showEdit,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
