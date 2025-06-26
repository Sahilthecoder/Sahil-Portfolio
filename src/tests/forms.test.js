import { render, fireEvent } from '@testing-library/react';
import Contact from '../pages/Contact';

test('Contact form requires required fields', () => {
  const { getByText, getByLabelText } = render(<Contact />);
  const submitButton = getByText(/Send Request/i);

  fireEvent.click(submitButton);
  expect(window.alert).toHaveBeenCalled(); // You need to mock alert in test setup
});
