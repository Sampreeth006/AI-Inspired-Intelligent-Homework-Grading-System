import React from 'react';

export default function HomeworkList({ homeworks }) {
  return (
    <div className="border p-4 rounded-lg bg-white shadow">    
      <h3 className="font-semibold mb-2">All Homeworks</h3>
      <ul className="list-disc pl-5">
        {homeworks.map(hw => (
          <li key={hw.id}>{hw.title} ({hw.questions.length} Qs)</li>
        ))}
      </ul>
    </div>
  );
}