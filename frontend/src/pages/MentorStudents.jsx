import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StudentDetails from './../components/todisplaystudentdetails.jsx';
import { NavbarSimple as Header } from '../components/header.jsx';
import UStudents from './seeunassigned.jsx';
const MentorStudents = () => {
  const { id } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8787/mentors/${id}/students`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStudents();
  }, [id]);

  return (
    <div>
      <Header />
      {students.map(student => (
        <StudentDetails key={student.id} name={student.name} id={student.id} />
      
      ))}
      <UStudents></UStudents>
    </div>
  );
};

export default MentorStudents;
