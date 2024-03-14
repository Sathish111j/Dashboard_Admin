import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StudentDetails from './../components/todisplaystudentdetails.jsx';
import { NavbarSimple as Header } from '../components/header.jsx';
import UStudents from './seeunassigned.jsx';
import Lock from './../components/lockcomponent.jsx';
import Print from './../components/print.jsx';

const MentorStudents = () => {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [unassignedStudents, setUnassignedStudents] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`https://backend.sathish333j.workers.dev/mentors/${id}/students`);
        if (!response.ok) {
          throw new Error('Failed to fetch assigned students');
        }
        const assignedStudents = await response.json();
        setStudents(assignedStudents);
  
        const unassignedResponse = await fetch('https://backend.sathish333j.workers.dev/students/unassigned');
        if (!unassignedResponse.ok) {
          throw new Error('Failed to fetch unassigned students');
        }
        const unassignedData = await unassignedResponse.json();
        setUnassignedStudents(unassignedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchStudents();
  
    return () => {
      fetchStudents();
    };
  }, [id,students,isLocked]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      {students.map(student => (
        <StudentDetails key={student.id} name={student.name} id={student.id} mentorId={id} setStudents={setStudents} isLocked={ isLocked} />
      ))}
      <Lock students={students} isLocked={isLocked} setIsLocked={setIsLocked} />
      <br />
      <Print students={students} />
      <br />
      <UStudents mentorId={id} setUnassignedStudents={setUnassignedStudents} unassignedStudents={ unassignedStudents} />
    </div>
  );
};

export default MentorStudents;