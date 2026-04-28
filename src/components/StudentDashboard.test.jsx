// src/components/StudentDashboard.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StudentDashboard from './StudentDashboard';
import * as storage from '../services/storage';

// stub out the child components
jest.mock('./HomeworkSubmission', () => () => <div data-testid="submission" />);
jest.mock('./ResultsLeaderboard',  () => () => <div data-testid="leaderboard" />);

describe('StudentDashboard', () => {
  beforeEach(() => {
    jest.spyOn(storage, 'load').mockImplementation(key => {
      if (key === 'homeworks') return [];
      if (key === 'grades')    return [];
      return null;
    });
    jest.spyOn(storage, 'save').mockImplementation(() => {});
  });
  afterEach(() => jest.restoreAllMocks());

  it('renders the "no homeworks" message when there are none', () => {
    render(<StudentDashboard onLogout={() => {}} />);
    // getByText will throw if not found
    const msg = screen.getByText(/No homeworks found\. Create one as a teacher\./);
    expect(msg).toBeDefined();
  });

  it('renders a button for each stored homework', () => {
    storage.load.mockImplementation(key => {
      if (key === 'homeworks')
        return [{ id: 1, title: 'HW1', questions: [] }];
      return [];
    });
    render(<StudentDashboard onLogout={() => {}} />);
    const hwButton = screen.getByRole('button', { name: 'HW1' });
    expect(hwButton).toBeDefined();
  });

  it('calls onLogout when the Logout button is clicked', () => {
    const onLogout = jest.fn();
    render(<StudentDashboard onLogout={onLogout} />);
    fireEvent.click(screen.getByText('Logout'));
    expect(onLogout).toHaveBeenCalled();
  });
});
