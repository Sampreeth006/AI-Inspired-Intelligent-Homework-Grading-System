// src/App.jsx

import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import { load, save } from './services/storage';

export default function App() {
  // Try to restore a previous session
  const [user, setUser] = useState(() => load('user') || null);

  // Whenever `user` changes, persist only that object
  useEffect(() => {
    if (user) {
      save('user', user);
      // We store username for grading modules
      localStorage.setItem('username', user.name);
    }
  }, [user]);

  // Called by <Login> with (collegeId, name, role)
  const handleLogin = (collegeId, name, role) => {
    setUser({ collegeId, name, role });
  };

  // Called by dashboards when “Logout” is clicked
  const handleLogout = () => {
    setUser(null);
    // Remove only the user keys—leave `homeworks` & `grades` intact
    localStorage.removeItem('user');
    localStorage.removeItem('username');
  };

  // If not logged in, show the login screen
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // Route to the appropriate dashboard
  return user.role === 'teacher'
    ? <TeacherDashboard onLogout={handleLogout} />
    : <StudentDashboard onLogout={handleLogout} />;
}
