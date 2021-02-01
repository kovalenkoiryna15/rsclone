import ITask from 'Entities/task-entities';
import { connect } from 'react-redux';

import { tasksActions } from 'Store/task';
import * as Types from 'Store/types';
import TaskView from './TaskView';

interface OwnProps {
  task: ITask;
  handleShow: () => void;
  isVisible: boolean;
}

const mapStateToProps = (_: Types.RootState, ownProps: OwnProps) => ({
  task: ownProps.task,
  handleShow: ownProps.handleShow,
  isVisible: ownProps.isVisible,
});

const mapDispatchToProps = {
  addTask: tasksActions.add,
  updateTask: tasksActions.update,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(TaskView);
