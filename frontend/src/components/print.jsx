import React, { useState, useEffect } from 'react';
import StudentTable from './studenttable.jsx';

const YourComponent = ({ mentorId }) => {
  const [students, setStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`https://backend.sathish333j.workers.dev/mentors/${mentorId}/students`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []); 


  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setShowTable(!showTable)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
      >
        {showTable ? 'Hide Table' : 'Show Table'}
      </button>
      {showTable && <StudentTable students={students} />}
    </div>
  );

};

export default YourComponent;
