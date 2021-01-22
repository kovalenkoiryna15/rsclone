import {
  createStore, StoreEnhancer, combineReducers, compose, applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import projectsReducer from './reducers/projects-reducers';
import tasksReducer from './reducers/tasks-reducers';

const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
});

type WindowWithDevTools = Window & {
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<unknown, unknown>
};

const isReduxDevtoolsExtensionExist = (arg: Window | WindowWithDevTools):
  arg is WindowWithDevTools => '__REDUX_DEVTOOLS_EXTENSION__' in arg;

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    isReduxDevtoolsExtensionExist(window)
      ? window.__REDUX_DEVTOOLS_EXTENSION__() : () => undefined,
  ),
);
/* eslint-enable */

export default store;
