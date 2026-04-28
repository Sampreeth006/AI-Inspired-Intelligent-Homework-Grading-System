import React, { useState } from 'react'
import HomeworkCreator from './HomeworkCreator'
import HomeworkList    from './HomeworkList'
import { load, save } from '../services/storage'

export default function TeacherDashboard({ onLogout }) {
  // load once on mount
  const [homeworks, setHomeworks] = useState(() => load('homeworks') || [])
  const [grades,    setGrades]    = useState(() => load('grades')    || [])

  // only save when a new HW is created
  const handleCreate = (hw) => {
    const next = [...homeworks, hw]
    setHomeworks(next)
    save('homeworks', next)
  }

  // only save when a new grade arrives
  const handleGrade = (g) => {
    const next = [...grades, g]
    setGrades(next)
    save('grades', next)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Teacher Dashboard</h2>
        <button className="btn btn-red" onClick={onLogout}>Logout</button>
      </div>

      {/* pass the handlers down */}
      <HomeworkCreator onCreate={handleCreate} />
      <HomeworkList   homeworks={homeworks} />
      <button
        className="btn btn-yellow"
        onClick={() => {
          const blob = new Blob(
            [JSON.stringify(grades, null, 2)],
            { type: 'application/json' }
          )
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'grades.json'
          a.click()
        }}
      >
        Export Grades
      </button>
    </div>
  )
}
