import { render, screen } from '@testing-library/react';
import App from './App';

test('renders action buttons', () => {
  render(<App />);
  const buttons = screen.getAllByRole('button');
  expect(buttons[0]).toHaveTextContent('Play');
  expect(buttons[1]).toHaveTextContent('Clear');
});
