import { combineReducers } from 'redux';

import projectsReducer from 'Store/reducers/projects-reducers';
import tasksReducer from 'Store/reducers/tasks-reducers';

export default combineReducers({
  tasks: tasksReducer,
  projects: projectsReducer,
});
