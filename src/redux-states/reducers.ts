import { combineReducers } from 'redux';

import firebaseReducer from 'States/firebase/reducers';
import projectsReducer from 'States/project/reducers';
import taskListReducer from 'States/task-list/reducers';
import taskReducer from 'States/task/reducers';
import userReducer from 'States/user/reducers';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  projects: projectsReducer,
  taskList: taskListReducer,
  tasks: taskReducer,
  user: userReducer,
});

export default rootReducer;
