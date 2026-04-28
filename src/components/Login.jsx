import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [collegeId, setCollegeId] = useState('');
  const [name, setName] = useState('');

  const attemptLogin = (role) => {
    if (!collegeId.trim() || !name.trim()) {
      alert('Please enter both your College ID and Name.');
      return;
    }
    onLogin(collegeId.trim(), name.trim(), role);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('./bg.jpg')",  
      }}
    >
      {/* semi-transparent overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />

      <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Homework Grader
        </h1>

        <label className="block text-sm font-medium mb-1 text-gray-700">
          College ID:
        </label>
        <input
          type="text"
          className="border p-2 w-full mb-4 rounded"
          placeholder="Enter your College ID"
          value={collegeId}
          onChange={(e) => setCollegeId(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1 text-gray-700">
          Your Name:
        </label>
        <input
          type="text"
          className="border p-2 w-full mb-6 rounded"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex gap-4">
          <button
            className="btn btn-blue flex-1"
            onClick={() => attemptLogin('teacher')}
          >
            I’m a Teacher
          </button>
          <button
            className="btn btn-green flex-1"
            onClick={() => attemptLogin('student')}
          >
            I’m a Student
          </button>
        </div>
      </div>
    </div>
  );
}
