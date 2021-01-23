import { combineReducers } from 'redux';

import firebaseReducer from 'Store/firebase/reducers';
import projectsReducer from 'Store/project/reducers';
import tasksReducer from 'Store/task/reducers';
import userAuthorizationReducer from 'Store/reducers/user-reducers';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
  user: userAuthorizationReducer,
});

export default rootReducer;
