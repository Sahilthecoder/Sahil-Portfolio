import { render } from '@testing-library/react';
import SkillBadge from '../components/SkillBadge';

test('SkillBadge renders skill text', () => {
  const skill = 'Data Analysis';
  const { getByText } = render(<SkillBadge skill={skill} />);
  expect(getByText(skill)).toBeInTheDocument();
});
