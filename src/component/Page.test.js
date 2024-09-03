// src/component/Page.test.js
import { render, screen } from '@testing-library/react';
import Page from './Page'; 

test('renders loading spinner initially', () => {
  render(<Page />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
