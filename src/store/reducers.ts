import { combineReducers } from 'redux';

import firebaseReducer from 'Store/firebase/reducers';
import projectsReducer from 'Store/project/reducers';
import tasksReducer from 'Store/task/reducers';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
});

export default rootReducer;
