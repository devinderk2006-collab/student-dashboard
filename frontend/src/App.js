import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './Dashboard';
import Grades from './pages/Grades';
import Attendance from './pages/Attendance';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import AdminStudents from './pages/AdminStudents';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/students" element={<AdminStudents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;