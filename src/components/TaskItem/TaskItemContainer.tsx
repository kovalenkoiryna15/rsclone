import { connect } from 'react-redux';

import { removeTask, toggleCompleteTask } from 'Store/task/actions';
import TaskItem from './TaskItem';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  removeTask,
  toggleCompleteTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
