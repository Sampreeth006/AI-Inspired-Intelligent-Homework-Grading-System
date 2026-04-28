// src/components/TeacherDashboard.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TeacherDashboard from './TeacherDashboard';
import * as storage from '../services/storage';

// stub the child components
jest.mock('./HomeworkCreator', () => () => <div data-testid="creator">[creator]</div>);
jest.mock('./HomeworkList',    () => ({ homeworks }) => (
  <div data-testid="list">
    Titles: {homeworks.map(hw => hw.title).join(',')}
  </div>
));

describe('TeacherDashboard', () => {
  beforeEach(() => {
    jest
      .spyOn(storage, 'load')
      .mockImplementation(key => key === 'homeworks'
        ? [{ id: 1, title: 'HW1', questions: [] }]
        : key === 'grades'
          ? [{ foo: 'bar' }]
          : []
      );
    jest.spyOn(storage, 'save').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the initial homework list from storage', () => {
    render(<TeacherDashboard onLogout={() => {}} />);
    const list = screen.getByTestId('list');
    expect(list.textContent).toContain('Titles: HW1');
  });

  it('calls onLogout when the Logout button is clicked', () => {
    const onLogout = jest.fn();
    render(<TeacherDashboard onLogout={onLogout} />);
    fireEvent.click(screen.getByText('Logout'));
    expect(onLogout).toHaveBeenCalled();
  });
});
