import { combineReducers } from 'redux';

import projectsReducer from 'Store/project/reducers';
import tasksReducer from 'Store/task/reducers';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  projects: projectsReducer,
});

export default rootReducer;
