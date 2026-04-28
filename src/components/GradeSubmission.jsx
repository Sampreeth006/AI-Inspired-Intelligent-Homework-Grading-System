import React, { useState } from "react";
import { gradeSubmission } from "../services/grader";
import { motion } from "framer-motion";

export default function GradeSubmission({ homework, onSubmit }) {
  const [answers, setAnswers] = useState(homework.questions.map(() => ""));
  const [report, setReport] = useState(null);

  const handleGrade = () => {
    const sub = { answers };
    const result = gradeSubmission(sub, homework);
    setReport(result);
    onSubmit(result);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="space-y-4">
        {homework.questions.map((q, i) => (
          <div key={i} className="space-y-1">
            <p className="font-semibold">
              {i + 1}. {q}
            </p>
            <input
              className="input input-bordered w-full"
              placeholder="Your answer"
              value={answers[i]}
              onChange={(e) => {
                const a = [...answers];
                a[i] = e.target.value;
                setAnswers(a);
              }}
            />
          </div>
        ))}

        <button className="btn btn-accent" onClick={handleGrade}>
          Submit & Grade
        </button>

        {report && (
          <div className="mt-4 card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title">Average: {report.average}%</h3>
              {report.results.map((r, i) => (
                <p key={i}>
                  Q{i + 1}: {r.score}% — {r.feedback}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
