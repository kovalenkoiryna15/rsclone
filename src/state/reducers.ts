import { combineReducers } from 'redux';

import firebaseReducer from 'State/firebase/reducers';
import projectsReducer from 'State/project/reducers';
import taskListReducer from 'State/task-list/reducers';
import taskReducer from 'State/task/reducers';
import userReducer from 'State/user/reducers';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  projects: projectsReducer,
  taskList: taskListReducer,
  tasks: taskReducer,
  user: userReducer,
});

export default rootReducer;
