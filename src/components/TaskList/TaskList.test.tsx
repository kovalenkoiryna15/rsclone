/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import { render } from '@testing-library/react';
import TaskList from './TaskList';

test('renders TaskList', () => {
  const { getByText } = render(<TaskList />);

  expect(getByText(/TaskList/i)).toBeInTheDocument();
});
