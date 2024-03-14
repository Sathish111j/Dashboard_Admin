import React, { useState, useEffect } from 'react';
import StudentTable from './studenttable.jsx';

const YourComponent = ({ students}) => {
  const [showTable, setShowTable] = useState(false);


  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setShowTable(!showTable)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
      >
        {showTable ? 'Hide Students marks' : 'Show Students marks'}
      </button>
      {showTable && <StudentTable students={students} />}
    </div>
  );

};

export default YourComponent;
