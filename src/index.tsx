import * as React from 'react';
import Container from 'react-bootstrap/Container';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'Store/store';
import App from './App';

import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Container fluid className="app-container">
        <App />
      </Container>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
