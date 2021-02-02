import IProject from 'Entities/project-entities';
import { connect } from 'react-redux';

import ITask from 'Entities/task-entities';
import { taskListActions } from 'Store/task-list';
import { tasksActions } from 'Store/task';
import * as Types from 'Store/types';
import TaskItem from './TaskItem';

type OwnProps = {
  task: ITask,
};

const mapStateToProps = (state: Types.RootState, ownProps: OwnProps) => ({
  task: ownProps.task,
  project: Object
    .values(state.projects.projects)
    .find(({ id }) => id === ownProps.task.project),
});

const mapDispatchToProps = {
  removeTask: tasksActions.removeTask,
  selectTask: taskListActions.selectTask,
  showEdit: taskListActions.showEdit,
  toggleCompleteTask: tasksActions.toggleCompleteTask,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
