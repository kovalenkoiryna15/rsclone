import React from 'react';
import { render } from '@testing-library/react';

import MainView from './MainView';

test('renders MainView', () => {
  const { getByText } = render(<MainView />);

  expect(getByText(/Tasks/i)).toBeInTheDocument();
});
