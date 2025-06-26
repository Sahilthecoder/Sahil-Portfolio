import { render } from '@testing-library/react';
import Home from '../pages/Home';

test('Home page has accessible landmarks', () => {
  const { container } = render(<Home />);
  expect(container.querySelector('section[aria-label="Introduction"]')).toBeInTheDocument();
});
