import React from 'react';
import { render } from '@testing-library/react';

import List from './List';

test('renders TaskList', () => {
  const { getByText } = render(<List />);

  expect(getByText(/TaskList/i)).toBeInTheDocument();
});
