import * as React from 'react';
import { render } from '@testing-library/react';

import TaskListNav from './TaskListNav';

test('renders TaskListNav', () => {
  const { getByText } = render(<TaskListNav />);

  expect(getByText(/Projects/i)).toBeInTheDocument();
});
