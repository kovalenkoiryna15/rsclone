import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';

import store from 'Store/store';
import MainView from './MainView';

test('renders MainView', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MainView isLoading={false} isAuth={false} />
    </Provider>,
  );

  expect(getByText(/Tasks/i)).toBeInTheDocument();
});
