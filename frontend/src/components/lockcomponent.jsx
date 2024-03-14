import React, { useState } from 'react';

const MentorStudentsCheck = ({ mentorId }) => {
  const [students, setStudents] = useState([]);
  
  const fetchStudents = async () => {
    try {
      const response = await fetch(`https://backend.sathish333j.workers.dev/${mentorId}/students`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleButtonClick = () => {
    if (students.length === 0) {
      // If students data hasn't been fetched yet
      fetchStudents();
    } else {
      const allStudentsHaveSubjects = students.every(student => 
        student.ideation !== null && student.ideation !== 0 &&
        student.execution !== null && student.execution !== 0 &&
        student.viva !== null && student.viva !== 0
      );
      if (allStudentsHaveSubjects) {
        alert('All students have their subjects assigned.');
      } else {
        alert('Not all students have their subjects assigned.');
      }
    }
  };

  return (
    <div>
     <button className="flex items-center justify-center bg-red-500 text-white py-3 px-3 rounded-md m-5" onClick={handleButtonClick}>Lock Marks</button>

    </div>
  );
};

export default MentorStudentsCheck;
