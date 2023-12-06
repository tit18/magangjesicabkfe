import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SLogin from './student_pages/Login';
import SDashboard from './student_pages/Dashboard';
import SCounseling from './student_pages/Counseling';
import SAppointment from './student_pages/Appointment';
import SHistory from './student_pages/History';

import TLogin from './teacher_pages/Login';
import TDashboard from './teacher_pages/Dashboard';
import TOnline from './teacher_pages/Online';
import TAppointment from './teacher_pages/Appointment';
import THistory from './teacher_pages/History';

function App() {
  // Check if the user is logged in

  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/" element={<SLogin />} />
      

        {/* Routes for student pages */}
        <Route path="/dashboard" element={<SDashboard />} />
        <Route path="/counseling" element={<SCounseling />} />
        <Route path="/appointment" element={<SAppointment />} />
        <Route path="/history" element={<SHistory />} />

        {/* Routes for teacher pages */}
        <Route path="/tlogin" element={<TLogin />} />
        <Route path="/tdashboard" element={<TDashboard />} />
        <Route path="/tonline" element={<TOnline />} />
        <Route path="/tappointment" element={<TAppointment />} />
        <Route path="/thistory" element={<THistory />} />
      </Routes>
    </Router>
  );
}

export default App;
