import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StudentDetails from './../components/todisplaystudentdetails.jsx';
import { NavbarSimple as Header } from '../components/header.jsx';
import UStudents from './seeunassigned.jsx';
import Lock from './../components/lockcomponent.jsx';
import Print from './../components/print.jsx';
const MentorStudents = () => {
  const { id  } = useParams();
  const [students, setStudents] = useState([]);
  const [assignedStudents, setAssignedStudents] = useState([]);


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`https://backend.sathish333j.workers.dev/mentors/${id}/students`);
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
    <div className="flex flex-col items-center justify-center">
      <Header />
      {students.map(student => (
        <StudentDetails key={student.id} name={student.name} id={student.id} />
      ))}
      <Lock mentorId={id} />
      <Print mentorId={id}/>
      <UStudents mentorId={id} />
    </div>
  );
  
};

export default MentorStudents;
