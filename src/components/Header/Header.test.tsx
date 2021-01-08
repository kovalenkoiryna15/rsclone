import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

test('renders Header', () => {
  const { getByText } = render(<Header />);

  expect(getByText(/TrackingTime/i)).toBeInTheDocument();
});
