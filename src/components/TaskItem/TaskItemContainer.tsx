import { connect } from 'react-redux';

import ITask from 'Entities/task-entities';
import { taskListActions } from 'Store/task-list';
import { taskActions } from 'Store/task';
import * as Types from 'Store/types';
import TaskItem from './TaskItem';

type OwnProps = {
  task: ITask;
};

const mapStateToProps = (state: Types.RootState, ownProps: OwnProps) => ({
  task: ownProps.task,
  project: Object.values(state.projects.projects).find(
    ({ id }) => id === ownProps.task.project
  ),
  userID: state.user.user.id,
});

const mapDispatchToProps = {
  removeTask: taskActions.removeTask,
  selectTask: taskListActions.selectTask,
  showEdit: taskListActions.showEdit,
  updateTask: taskActions.update,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
