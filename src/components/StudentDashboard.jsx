import React, { useState, useEffect } from 'react'
import HomeworkSubmission from './HomeworkSubmission'
import ResultsLeaderboard from './ResultsLeaderboard'
import { load, save }     from '../services/storage'

export default function StudentDashboard({ onLogout }) {
  // load homeworks fresh whenever this mounts
  const homeworks = load('homeworks') || []
  const [grades, setGrades] = useState(() => load('grades') || [])
  const [selectedId, setSelectedId] = useState(null)

  // persist new grades
  useEffect(() => {
    save('grades', grades)
  }, [grades])

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Student Dashboard</h2>
        <button className="btn btn-red" onClick={onLogout}>Logout</button>
      </div>

      {!selectedId ? (
        <div className="space-y-4">
          <h3 className="font-semibold">Pick a Homework</h3>
          {homeworks.length === 0
            ? <p className="text-gray-500">No homeworks found. Create one as a teacher.</p>
            : homeworks.map(hw => (
                <button
                  key={hw.id}
                  className="btn btn-blue block w-full"
                  onClick={() => setSelectedId(hw.id)}
                >
                  {hw.title}
                </button>
              ))
          }
        </div>
      ) : (
        <HomeworkSubmission
          homework={homeworks.find(h => h.id === selectedId)}
          onGrade={r => setGrades(g => [...g, r])}
          onBack={() => setSelectedId(null)}
        />
      )}

      <ResultsLeaderboard
        grades={grades}
        homework={homeworks.find(h => h.id === selectedId)}
      />
    </div>
  )
}
