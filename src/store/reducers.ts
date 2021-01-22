import { combineReducers } from 'redux';

import projectsReducer from 'Store/reducers/projects-reducers';
import tasksReducer from 'Store/reducers/tasks-reducers';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  projects: projectsReducer,
});

export default rootReducer;
