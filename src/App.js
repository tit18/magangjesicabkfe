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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<SLogin />} />
          <Route path='/dashboard' element={<SDashboard/>}/>
          <Route path='/counseling' element={<SCounseling/>}/>
          <Route path='/appointment' element={<SAppointment/>}/>
          <Route path='/history' element={<SHistory/>}/>

          <Route path='/teacher' element={<TLogin/>} />
          <Route path='/teacher/dashboard' element={<TDashboard/>}/>
          <Route path='/teacher/counseling' element={<TOnline/>}/>
          <Route path='/teacher/appointment' element={<TAppointment/>}/>
          <Route path='/teacher/history' element={<THistory/>}/>

          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </Router>
  );
}

export default App;
