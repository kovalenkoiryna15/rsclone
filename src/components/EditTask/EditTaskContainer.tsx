import { connect } from 'react-redux';

import ITask from 'Entities/task-entities';
import { tasksActions } from 'Store/task';
import * as Types from 'Store/types';
import EditTask from './EditTask';

interface OwnProps {
  task: ITask;
  handleShow: () => void;
  isVisible: boolean;
}

const mapStateToProps = (state: Types.RootState, ownProps: OwnProps) => ({
  task: ownProps.task,
  handleShow: ownProps.handleShow,
  isVisible: ownProps.isVisible,
  userID: state.user.user.id,
});

const mapDispatchToProps = {
  addTask: tasksActions.add,
  updateTask: tasksActions.update,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
