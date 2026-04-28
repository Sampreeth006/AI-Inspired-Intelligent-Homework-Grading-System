import React, { useState } from 'react';

export default function HomeworkCreator({ onCreate, exportGrades }) {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(10);                  // in minutes
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('one-word');  // 'one-word' | 'mcq' | 'descriptive'
  const [marks, setMarks] = useState(1);
  const [idealSolution, setIdealSolution] = useState('');
  const [options, setOptions] = useState(['', '']);             // for MCQ
  const [questions, setQuestions] = useState([]);

  const addOption = () => setOptions((o) => [...o, '']);
  const updateOption = (idx, val) =>
    setOptions((o) => o.map((opt, i) => (i === idx ? val : opt)));
  const removeOption = (idx) =>
    setOptions((o) => o.filter((_, i) => i !== idx));

  const addQuestion = () => {
    if (!questionText.trim() || !idealSolution.trim()) return;
    const q = {
      id: Date.now(),
      question: questionText.trim(),
      type: questionType,
      marks: Number(marks),
      answer: idealSolution.trim(),
      options: questionType === 'mcq' ? options.filter((o) => o.trim()) : []
    };
    setQuestions((qs) => [...qs, q]);
    // reset
    setQuestionText('');
    setQuestionType('one-word');
    setMarks(1);
    setIdealSolution('');
    setOptions(['', '']);
  };

  const createHomework = () => {
    if (!title.trim() || questions.length === 0) return;
    const hw = {
      id: Date.now(),
      title: title.trim(),
      durationSeconds: Number(duration) * 60,
      questions
    };
    onCreate(hw);
    // reset form
    setTitle('');
    setDuration(10);
    setQuestions([]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-bold">Teacher Dashboard</h2>

      {/* Homework Title */}
      <div>
        <label className="block font-medium mb-1">Homework Title:</label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Duration */}
      <div>
        <label className="block font-medium mb-1">Duration (mins):</label>
        <input
          type="number"
          min="1"
          className="input input-bordered w-32"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      {/* Question Form */}
      <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Question Text */}
          <div className="col-span-1 md:col-span-2">
            <label className="block font-medium mb-1">Question:</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter question text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>

          {/* Type */}
          <div>
            <label className="block font-medium mb-1">Type:</label>
            <select
              className="select select-bordered w-full"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <option value="one-word">One-Word</option>
              <option value="mcq">Multiple Choice</option>
              <option value="descriptive">Descriptive</option>
            </select>
          </div>

          {/* Marks */}
          <div>
            <label className="block font-medium mb-1">Marks:</label>
            <input
              type="number"
              min="1"
              className="input input-bordered w-full"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
            />
          </div>
        </div>

        {/* Ideal Solution */}
        <div>
          <label className="block font-medium mb-1">Ideal Solution:</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter correct answer"
            value={idealSolution}
            onChange={(e) => setIdealSolution(e.target.value)}
          />
        </div>

        {/* MCQ Options */}
        {questionType === 'mcq' && (
          <div className="space-y-2">
            <label className="block font-medium mb-1">
              Options (enter one per line):
            </label>
            {options.map((opt, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  className="input input-bordered flex-1"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => updateOption(i, e.target.value)}
                />
                <button
                  className="btn btn-sm btn-red"
                  onClick={() => removeOption(i)}
                  disabled={options.length < 2}
                >
                  ✕
                </button>
              </div>
            ))}
            <button className="btn btn-sm btn-blue" onClick={addOption}>
              + Add Option
            </button>
          </div>
        )}

        {/* Add Question */}
        <button
          className="btn btn-green w-full"
          onClick={addQuestion}
          disabled={!questionText.trim() || !idealSolution.trim()}
        >
          Add Question
        </button>
      </div>

      {/* List of Questions */}
      {questions.length > 0 && (
        <div className="border p-4 rounded-lg bg-gray-50">
          <h3 className="font-semibold mb-2">Current Questions</h3>
          <ul className="list-decimal pl-6 space-y-2">
            {questions.map((q) => (
              <li key={q.id}>
                {q.question} <em>({q.marks} pts, {q.type})</em>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
      <button
          className="btn btn-blue"
          onClick={createHomework}
          disabled={!title.trim() || questions.length === 0}
        >
          Create Homework
        </button>
      </div>
    </div>
  );
}
