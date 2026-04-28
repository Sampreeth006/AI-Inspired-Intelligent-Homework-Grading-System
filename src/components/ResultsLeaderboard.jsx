import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ResultsLeaderboard({ grades, homework }) {
  if (!homework || grades.length === 0) return null;

  const data = grades.filter(g => g.homeworkId === homework.id)
    .map(g => ({ name: g.username, scorePct: (g.score / homework.questions.length) * 100 }));

  const avg = data.reduce((sum,d) => sum + d.scorePct, 0) / data.length;
  const top5 = [...data].sort((a,b) => b.scorePct - a.scorePct).slice(0,5);

  return (
    <div className="border p-4 rounded-lg bg-white shadow space-y-4">
      <h3 className="font-semibold">Leaderboard & Stats</h3>
      <ol className="list-decimal pl-6">
        {top5.map((u,i) => <li key={i}>{u.name}: {u.scorePct.toFixed(1)}%</li>)}
      </ol>
      <p>Average: {avg.toFixed(1)}%</p>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="scorePct" fill="#4ade80" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}