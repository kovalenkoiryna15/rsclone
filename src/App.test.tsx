import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from 'Store/store';

import App from './App';

test('renders App', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  expect(getByText(/TrackingTime/i)).toBeInTheDocument();
});
