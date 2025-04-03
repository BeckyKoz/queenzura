import { render, screen } from '@testing-library/react';
import App from '../App.js';

test('renders Queenzura text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Queenzura/i);
  expect(linkElement).toBeInTheDocument();
});

test('board renders', () => {
  render(<App />)
  const boardElement = screen.getByTestId('gameBoard')
  expect(boardElement).toBeInTheDocument();
});

