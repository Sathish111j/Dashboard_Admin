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
  const [marksUpdated, setMarksUpdated] = useState(false);

  useEffect(() => {
    const fetchAssignedStudents = async () => {
      try {
        const assignedResponse = await fetch(`https://dashboardbackend.sathish333j.workers.dev/mentors/${id}/students`);
        if (!assignedResponse.ok) {
          throw new Error('Failed to fetch assigned students');
        }
        const assignedStudents = await assignedResponse.json();
        setStudents(assignedStudents);
      } catch (error) {
        console.error('Error fetching assigned students:', error);
      }
    };

    fetchAssignedStudents();
  }, [id, unassignedStudents, isLocked, marksUpdated]);

  useEffect(() => {
    const fetchUnassignedStudents = async () => {
      try {
        const unassignedResponse = await fetch('https://dashboardbackend.sathish333j.workers.dev/students/unassigned');
        if (!unassignedResponse.ok) {
          throw new Error('Failed to fetch unassigned students');
        }
        const unassignedData = await unassignedResponse.json();
        setUnassignedStudents(unassignedData);
      } catch (error) {
        console.error('Error fetching unassigned students:', error);
      }
    };

    fetchUnassignedStudents();
  }, [students.length, isLocked, marksUpdated]);

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white min-h-screen">
      <Header />
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Ideation</th>
              <th className="px-4 py-2">Execution</th>
              <th className="px-4 py-2">Viva/Pitch</th>
              <th className="px-4 py-2">Total Marks</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <StudentDetails
                key={student.id}
                name={student.name}
                id={student.id}
                mentorId={id}
                setStudents={setStudents}
                isLocked={isLocked}
                setMarksUpdated={setMarksUpdated}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Lock students={students} isLocked={isLocked} setIsLocked={setIsLocked} />
      <br />
      <Print students={students} marksUpdated={marksUpdated} />
      <br />
      <UStudents mentorId={id} setUnassignedStudents={setUnassignedStudents} unassignedStudents={unassignedStudents} />
    </div>
  );
};

export default MentorStudents;
