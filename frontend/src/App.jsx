import { useState } from 'react'
import { NavbarSimple as Header } from './components/header.jsx';
import {SimpleFooter as Footer} from './components/footer.jsx';
import './App.css'
import UserInfoCard from './components/viewMentors.jsx';
import UserInfoCardtoassign from './components/toassignstudents.jsx';
import Studentdetail from './components/todisplaystudentdetails.jsx';
// import Mentors from './pages/mentordeatils.jsx';
import Unassigned from './pages/seeunassigned.jsx';
import Mentors from './pages/mentornames.jsx';
import MentorStudents from './pages/MentorStudents.jsx';
import Students from './pages/studentdeatils.jsx';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Navigate to="/mentors/all" />} />
          <Route path="/mentors/all" element={<Mentors />} />
          <Route path="/students/all" element={<Students/>} />
          <Route path="/mentors/:id/students" element={<MentorStudents/>} />
        </Routes>
      </BrowserRouter>
    </>
  )  
}

export default App
