
import './App.css'
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
