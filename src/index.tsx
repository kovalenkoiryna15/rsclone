import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.scss';
import store from 'Store/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
