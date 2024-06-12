import React from 'react';

const Lock = ({ students, isLocked, setIsLocked }) => {
  const handleButtonClick = () => {
    if (students.length === 0) {
      // If students data hasn't been fetched yet
      fetchStudents();
    } else {
      const allStudentsHaveSubjects = students.every(student =>
        student.ideation !== null &&
        student.ideation !== 0 &&
        student.execution !== null &&
        student.execution !== 0 &&
        student.viva !== null &&
        student.viva !== 0
      );
      if (allStudentsHaveSubjects) {
        setIsLocked(!isLocked);
      } else {
        alert('Not all students have their subjects assigned.');
      }
    }
  };

  return (
    <div>
      <button
        className={`flex items-center justify-center ${
          isLocked ? 'bg-gray-500 text-white' : 'bg-black text-white'
        } py-3 px-3 rounded-md m-5`}
        onClick={handleButtonClick}
      >
        {isLocked ? 'Unlock Marks' : 'Lock Marks'}
      </button>
    </div>
  );
};

export default Lock;
