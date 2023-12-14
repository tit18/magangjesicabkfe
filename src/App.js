import React, {useState, useEffect} from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
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

import NotFound from './components/General/NotFound';


function App() {
  // Check if the user is logged in

  const [counselingChatError, setCounselingChatError] = useState(false);

  // Check if the user is logged in

  useEffect(() => {
    // Simulate an error in /counseling/chat
    // You should replace this with your actual error-checking logic
    // For example, you might check if data fetching fails or other conditions
    // that indicate an error in the /counseling/chat page.
    const simulateError = () => {
      // Set the error state to true to simulate an error
      setCounselingChatError(true);
    };

    // Call the function to simulate an error
    simulateError();
  }, []);

  return (
    <HashRouter>
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

          {/* Auto-navigate to NotFound if an error occurs in /counseling/chat */}
        {counselingChatError && (
          <Route
            path='/teacher/counseling/chat'
            element={<Navigate to='/notfound' />}
          />
        )}
        
        <Route path='/teacher/counseling/chat' element={<TChatPage />} />


          <Route path='*' element={<NotFound/>} />
        </Routes>
      </HashRouter>
  );
}


export default App;
