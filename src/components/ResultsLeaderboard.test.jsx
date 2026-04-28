// src/components/ResultsLeaderboard.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultsLeaderboard from './ResultsLeaderboard';

// 1) Stub out all of recharts
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  BarChart: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  Tooltip: () => <div />,
  Bar: () => <div />,
}));

describe('ResultsLeaderboard', () => {
  it('renders nothing if no homework or no matching grades', () => {
    const { container } = render(
      <ResultsLeaderboard grades={[]} homework={null} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders only grades matching the given homework and shows the correct average', () => {
    // homework has 3 questions
    const homework = { id: 1, questions: [{},{},{}] };
    // three grades, one of which has a different homeworkId
    const grades = [
      { username: 'Alice', score: 3, homeworkId: 1 }, // 3/3 → 100%
      { username: 'Bob',   score: 2, homeworkId: 1 }, // 2/3 → 66.7%
      { username: 'Carol', score: 1, homeworkId: 2 }, // filtered out
    ];

    render(<ResultsLeaderboard grades={grades} homework={homework} />);

    // should only list Alice and Bob
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(2);

    // check their textContent directly
    expect(items[0].textContent).toContain('Alice: 100.0%');
    expect(items[1].textContent).toContain('Bob: 66.7%');

    // average = (100 + 66.7) / 2 = 83.35 → 83.3
    const avg = screen.getByText(/^Average:/);
    expect(avg).toBeDefined();
    expect(avg.textContent).toContain('83.3%');
  });
});
