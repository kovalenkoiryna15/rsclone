import React from 'react';
import { render } from '@testing-library/react';

import Nav from './Nav';

test('renders TaskListNav', () => {
  const { getByText } = render(<Nav />);

  expect(getByText(/Projects/i)).toBeInTheDocument();
});
