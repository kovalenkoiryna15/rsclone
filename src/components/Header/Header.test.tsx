import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';

import store from 'State/store';
import Header from './Header';

test('renders Header', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  expect(getByText(/RSClone Tracking Time/i)).toBeInTheDocument();
});
