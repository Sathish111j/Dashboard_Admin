import React, { useState, useEffect } from 'react';
import UserInfoCard from './UserInfoCard'; // Assuming this is your UserInfoCard component

const MentorStudentsList = ({ mentorId }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8787/mentors/${mentorId}/students`);
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
  }, [mentorId]);

  return (
    <div>
      <h2 className="text-lg font-bold">Students under Mentor {mentorId}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {students.map(student => (
          <UserInfoCard
            key={student.id}
            name={student.name}
            email={student.email}
            id={student.id}
          />
        ))}
      </div>
    </div>
  );
};

export default MentorStudentsList;
