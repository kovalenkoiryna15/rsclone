import { combineReducers } from 'redux';

import firebaseReducer from 'Store/firebase/reducers';
import projectsReducer from 'Store/project/reducers';
import taskListReducer from 'Store/task-list/reducers';
import taskReducer from 'Store/task/reducers';
import userReducer from 'Store/user/reducers';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  projects: projectsReducer,
  taskList: taskListReducer,
  tasks: taskReducer,
  user: userReducer,
});

export default rootReducer;
