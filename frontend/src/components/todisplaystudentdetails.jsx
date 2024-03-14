import React, { useState } from 'react';
import { NavbarSimple as Header } from '../components/header.jsx';
const StudentDetails = ({ name, email, id }) => {
  const [subject1Marks, setSubject1Marks] = useState(0);
  const [subject2Marks, setSubject2Marks] = useState(0);
  const [subject3Marks, setSubject3Marks] = useState(0);

  const handleSubjectMarksChange = (setter, value) => {
    if (value >= 0 && value <= 10) {
      setter(value);
    } else {
      setter(0); // Resetting to 0 if value is not within range
    }
  };

  const calculateTotalMarks = () => {
    return subject1Marks + subject2Marks + subject3Marks;
  };

  return (
    <>
      <div className="flex justify-center items-center p-2">
        <div className="bg-white shadow-md rounded-lg p-4 w-100">
          <p className="text-gray-700 text-sm font-bold">
            <span className="text-gray-900 p-2">StudentName: {name} </span>
            <span className="text-gray-900 p-2">StudentID: {id} </span>
          </p>
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <span>Ideation</span>
              <input
                type="number"
                value={subject1Marks}
                onChange={(e) =>
                  handleSubjectMarksChange(
                    setSubject1Marks,
                    parseInt(e.target.value)
                  )
                }
                className="border rounded-md p-2 w-20 mt-1"
              />
              {subject1Marks < 0 || subject1Marks > 10 ? (
                <p className="text-red-500 text-xs">Marks should be between 0 and 10.</p>
              ) : null}
            </div>
            <div className="flex flex-col items-center">
              <span>Execution</span>
              <input
                type="number"
                value={subject2Marks}
                onChange={(e) =>
                  handleSubjectMarksChange(
                    setSubject2Marks,
                    parseInt(e.target.value)
                  )
                }
                className="border rounded-md p-2 w-20 mt-1"
              />
              {subject2Marks < 0 || subject2Marks > 10 ? (
                <p className="text-red-500 text-xs">Marks should be between 0 and 10.</p>
              ) : null}
            </div>
            <div className="flex flex-col items-center">
              <span>Viva/Pitch</span>
              <input
                type="number"
                value={subject3Marks}
                onChange={(e) =>
                  handleSubjectMarksChange(
                    setSubject3Marks,
                    parseInt(e.target.value)
                  )
                }
                className="border rounded-md p-2 w-20 mt-1"
              />
              {subject3Marks < 0 || subject3Marks > 10 ? (
                <p className="text-red-500 text-xs">Marks should be between 0 and 10.</p>
              ) : null}
            </div>
            <button className="bg-green-500 text-white py-1 px-2 rounded-md m-5">
              Enter
            </button>
          </div>
          <p className="text-gray-900 font-bold mt-3">
            Total Marks: {calculateTotalMarks()}
          </p>
        </div>
      </div>
    </>
  );
};

export default StudentDetails;
