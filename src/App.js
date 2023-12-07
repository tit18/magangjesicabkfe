import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SLogin from './student_pages/Login';
import SDashboard from './student_pages/Dashboard';
import SCounseling from './student_pages/Counseling';
import SAppointment from './student_pages/Appointment';
import SHistory from './student_pages/History';
import SchatPage from './student_pages/Chatpage';

import TLogin from './teacher_pages/Login';
import TDashboard from './teacher_pages/Dashboard';
import TCounseling from './teacher_pages/Counseling';
import TAppointment from './teacher_pages/Appointment';
import THistory from './teacher_pages/History';
import TChatPage from './teacher_pages/ChatPage';


function App() {
  // Check if the user is logged in

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<SLogin />} />
          <Route path='/dashboard' element={<SDashboard/>}/>
          <Route path='/counseling' element={<SCounseling/>}/>
          <Route path='/appointment' element={<SAppointment/>}/>
          <Route path='/history' element={<SHistory/>}/>
          <Route path='/counseling/:id_teacher' element={<SchatPage/>} />

          <Route path='/teacher' element={<TLogin/>} />
          <Route path='/teacher/dashboard' element={<TDashboard/>}/>
          <Route path='/teacher/counseling' element={<TCounseling/>}/>
          <Route path='/teacher/appointment' element={<TAppointment/>}/>
          <Route path='/teacher/history' element={<THistory/>}/>
          <Route path='/teacher/counseling/:id_student' element={<TChatPage />} />

          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
  );
}


export default App;
