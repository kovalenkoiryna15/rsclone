import { createStore, StoreEnhancer, combineReducers } from 'redux';
import { projectsReducer } from './reducers/projects-reducers';
import { tasksReducer } from './reducers/tasks-reducers';

const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
});

type WindowWithDevTools = Window & {
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<unknown, {}>
 }

 const isReduxDevtoolsExtenstionExist =
 (arg: Window | WindowWithDevTools):
   arg is WindowWithDevTools  => {
     return  '__REDUX_DEVTOOLS_EXTENSION__' in arg;
 }

export const store = createStore(
  rootReducer,
  isReduxDevtoolsExtenstionExist(window) ?
  window.__REDUX_DEVTOOLS_EXTENSION__() : undefined
);
