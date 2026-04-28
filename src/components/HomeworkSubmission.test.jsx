// src/components/HomeworkSubmission.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomeworkSubmission from './HomeworkSubmission';

// Stub out gradeSubmission so it never blows up
jest.mock('../services/grader', () => ({
  gradeSubmission: () => ({
    results: [],
    scoredMarks: 0,
    totalMarks: 0,
    average: 0,
  }),
}));

describe('HomeworkSubmission', () => {
  const homework = {
    id: 1,
    title: 'My Test HW',
    durationSeconds: 60,
    questions: [], // no inputs to worry about
  };

  it('renders the title and back button works', () => {
    const onBack = jest.fn();
    render(
      <HomeworkSubmission
        homework={homework}
        onGrade={() => {}}
        onBack={onBack}
      />
    );

    // Title shows up
    const titleEl = screen.getByText('My Test HW');
    expect(titleEl).toBeTruthy();

    // Back button fires onBack
    const backBtn = screen.getByText('← Back');
    fireEvent.click(backBtn);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('disables the submit button after click and shows "Submitted"', () => {
    const onGrade = jest.fn();
    render(
      <HomeworkSubmission
        homework={homework}
        onGrade={onGrade}
        onBack={() => {}}
      />
    );

    const submitBtn = screen.getByText('Submit & Grade');
    // initially not disabled
    expect(submitBtn.disabled).toBe(false);

    fireEvent.click(submitBtn);

    // now disabled
    expect(submitBtn.disabled).toBe(true);

    // text flips to "Submitted"
    const submittedBtn = screen.getByText('Submitted');
    expect(submittedBtn).toBeTruthy();
  });
});
