import ITask from 'Entities/task-entities';
import { connect } from 'react-redux';

import { removeTask, toggleCompleteTask } from 'Store/task/actions';
import * as Types from 'Store/types';
import TaskItem from './TaskItem';

type OwnProps = {
  task: ITask,
};

const mapStateToProps = (_: Types.RootState, ownProps: OwnProps) => ({
  task: ownProps.task,
});

const mapDispatchToProps = {
  removeTask,
  toggleCompleteTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
