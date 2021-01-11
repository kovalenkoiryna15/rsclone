import * as React from 'react';
import { render } from '@testing-library/react';

import TaskList from './TaskList';

test('renders TaskList', () => {
  const { getByText } = render(<TaskList />);

  expect(getByText(/TaskList/i)).toBeInTheDocument();
});
