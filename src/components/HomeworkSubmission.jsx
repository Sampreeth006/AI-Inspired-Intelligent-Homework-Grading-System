import React, { useState, useEffect } from "react";
import { gradeSubmission } from "../services/grader";

export default function HomeworkSubmission({ homework, onGrade, onBack }) {
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(homework.durationSeconds || 600);
  const [submitted, setSubmitted] = useState(false);

  // countdown effect: stops if submitted
  useEffect(() => {
    if (submitted) return;
    if (timer > 0) {
      const t = setTimeout(() => setTimer((t) => t - 1), 1000);
      return () => clearTimeout(t);
    }
    // auto‐submit at zero
    handleSubmit();
  }, [timer, submitted]);

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);

    const submission = { answers };
    const { results, scoredMarks, totalMarks, average } =
      gradeSubmission(submission, homework);

    onGrade({
      username: localStorage.getItem("username"),
      feedback: results,
      score: scoredMarks,
      total: totalMarks,
      average,
      homeworkId: homework.id,
    });
  };

  return (
    <div className="border p-4 rounded-lg bg-white shadow space-y-4">
      <button className="btn btn-sm" onClick={onBack}>
        ← Back
      </button>
      <h3 className="text-xl">{homework.title}</h3>

      <p>
        Time left:{" "}
        {submitted
          ? "—"
          : `${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`}
      </p>

      {homework.questions.map((q) => (
        <div key={q.id} className="space-y-1">
          <p className="font-semibold">
            {q.question}{" "}
            <span className="text-sm text-gray-500">
              ({q.marks} pts, {q.type})
            </span>
          </p>
          {q.type === "mcq" ? (
            <select
              className="select select-bordered w-full"
              disabled={submitted}
              onChange={(e) =>
                setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
              }
            >
              <option value="">-- choose --</option>
              {q.options.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="input input-bordered w-full"
              disabled={submitted}
              onChange={(e) =>
                setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
              }
            />
          )}
        </div>
      ))}

      <button
        className="btn btn-green mt-4"
        onClick={handleSubmit}
        disabled={submitted}
      >
        {submitted ? "Submitted" : "Submit & Grade"}
      </button>
    </div>
  );
}
