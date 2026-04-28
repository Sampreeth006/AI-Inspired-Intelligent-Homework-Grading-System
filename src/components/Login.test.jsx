// src/components/Login.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login', () => {
  let onLogin;

  beforeEach(() => {
    onLogin = jest.fn();
    // suppress the real alert
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    window.alert.mockRestore();
  });

  it('alerts if you try to submit with empty fields', () => {
    render(<Login onLogin={onLogin} />);
    fireEvent.click(screen.getByText(/Teacher/i));
    expect(window.alert).toHaveBeenCalledWith(
      'Please enter both your College ID and Name.'
    );
    expect(onLogin).not.toHaveBeenCalled();
  });

  it('calls onLogin with trimmed values and "teacher" role', () => {
    render(<Login onLogin={onLogin} />);
    fireEvent.change(
      screen.getByPlaceholderText(/Enter your College ID/i),
      { target: { value: '  ABC123  ' } }
    );
    fireEvent.change(
      screen.getByPlaceholderText(/Enter your Name/i),
      { target: { value: '  Jane Doe  ' } }
    );
    fireEvent.click(screen.getByText(/Teacher/i));

    expect(onLogin).toHaveBeenCalledWith('ABC123', 'Jane Doe', 'teacher');
  });

  it('calls onLogin with trimmed values and "student" role', () => {
    render(<Login onLogin={onLogin} />);
    fireEvent.change(
      screen.getByPlaceholderText(/Enter your College ID/i),
      { target: { value: 'XYZ789' } }
    );
    fireEvent.change(
      screen.getByPlaceholderText(/Enter your Name/i),
      { target: { value: 'John Smith' } }
    );
    fireEvent.click(screen.getByText(/Student/i));

    expect(onLogin).toHaveBeenCalledWith('XYZ789', 'John Smith', 'student');
  });
});
