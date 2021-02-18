import { combineReducers } from 'redux';

import firebaseReducer from 'States/firebase/reducer';
import projectsReducer from 'States/project/reducer';
import taskListReducer from 'States/task-list/reducer';
import taskReducer from 'States/task/reducer';
import userReducer from 'States/user/reducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  projects: projectsReducer,
  taskList: taskListReducer,
  tasks: taskReducer,
  user: userReducer,
});

export default rootReducer;
