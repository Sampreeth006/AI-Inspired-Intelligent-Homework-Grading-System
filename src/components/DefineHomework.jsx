import React, { useState } from "react";
import { motion } from "framer-motion";

export default function DefineHomework({ onSave }) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([""]);

  const addQ = () => setQuestions(qs => [...qs, ""]);
  const changeQ = (i, v) => {
    const arr = [...questions]; arr[i] = v; setQuestions(arr);
  };
  const save = () => onSave({ title, questions: questions.filter(q=>q.trim()) });

  return (
    <motion.div
      initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
      transition={{ duration:0.4 }}
    >
      <div className="space-y-4">
        <input
          className="input input-bordered w-full"
          placeholder="Homework Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        {questions.map((q,i) => (
          <input
            key={i}
            className="input input-bordered w-full"
            placeholder={`Question ${i+1}`}
            value={q}
            onChange={e => changeQ(i, e.target.value)}
          />
        ))}

        <div className="flex gap-2">
          <button className="btn btn-sm" onClick={addQ}>Add Question</button>
          <button
            className="btn btn-primary btn-sm"
            onClick={save}
            disabled={!title.trim()||questions.every(q=>!q.trim())}
          >
            Save Homework
          </button>
        </div>
      </div>
    </motion.div>
  );
}