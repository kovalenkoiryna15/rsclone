import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';

import store from 'States/root-store';
import App from './App';

test('renders App', () => {
  const { getAllByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getAllByText(/RSClone Tracking Time/i)).toHaveLength(3);
});
