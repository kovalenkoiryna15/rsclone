import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from 'Store/store';
import TaskListNav from './TaskListNav';

test('renders TaskListNav', () => {
  const fakeProjects = { key: { id: 'id', title: 'title' } };
  const { getByText } = render(
    <Provider store={store}>
      <Router>
        <TaskListNav projects={fakeProjects} isLoading={false} />
      </Router>
    </Provider>,
  );

  expect(getByText(/Projects/i)).toBeInTheDocument();
});
