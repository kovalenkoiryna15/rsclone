import React from 'react';
import { render } from '@testing-library/react';
import TaskView from './TaskView';

test('renders TaskView', () => {
  const { getByText } = render(<TaskView />);

  expect(getByText(/TaskView/i)).toBeInTheDocument();
});
