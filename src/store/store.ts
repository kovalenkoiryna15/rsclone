import { createStore, StoreEnhancer, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { projectsReducer } from './reducers/projects-reducers';
import { tasksReducer } from './reducers/tasks-reducers';

const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
});

type WindowWithDevTools = Window & {
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<unknown, unknown>
};

const isReduxDevtoolsExtenstionExist =
  (arg: Window | WindowWithDevTools):
    arg is WindowWithDevTools  => {
      return  '__REDUX_DEVTOOLS_EXTENSION__' in arg;
};

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    isReduxDevtoolsExtenstionExist(window)
    ? window.__REDUX_DEVTOOLS_EXTENSION__() : () => undefined,
));
