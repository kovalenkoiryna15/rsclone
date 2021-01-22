import { combineReducers } from 'redux';

import projectsReducer from 'Store/project/projects-reducers';
import tasksReducer from 'Store/task/tasks-reducers';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  projects: projectsReducer,
});

export default rootReducer;
