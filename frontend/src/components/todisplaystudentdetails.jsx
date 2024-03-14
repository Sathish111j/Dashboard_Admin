import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests

const StudentDetails = ({ name, email, id }) => {
  const [subject1Marks, setSubject1Marks] = useState(0);
  const [subject2Marks, setSubject2Marks] = useState(0);
  const [subject3Marks, setSubject3Marks] = useState(0);
  const [totalMarks, setTotalMarks] = useState(null);


  const handleSubjectMarksChange = (setter, value) => {
    if (value >= 0 && value <= 10) {
      setter(value);
    } else {
      setter(0); 
    }
  };
  
  
  useEffect(() => {
    fetch(`https://backend.sathish333j.workers.dev/students/totalMarks/${id}`)
      .then(response => response.json())
      .then(data => setTotalMarks(data))
      .catch(error => console.error('Error fetching mentors:', error));
  }, [handleSubjectMarksChange]);

  const handleEnterMarks = async () => {
    try {
      const response = await axios.post(
        `https://backend.sathish333j.workers.dev/marks`,
        {
          studentId: id,
          ideation: subject1Marks,
          execution: subject2Marks,
          viva: subject3Marks
        }
      );
      console.log("Marks entered successfully:", response.data);

    } catch (error) {
      console.error("Error entering marks:", error);
  
    }
  };

  const handleRemove = async () => {
  try {
    await axios.post(
      "https://backend.sathish333j.workers.dev/mentors/unassign",
      {
        studentId: id
      }
    );
    console.log("Student unassigned successfully.");

  } catch (error) {
    console.error("Error unassigning student:", error);

  }
};


  return (
    <>
      <div className="flex justify-center items-center p-2">
        <div className="bg-white shadow-md rounded-lg p-4 w-100">
          <p className="text-gray-700 text-sm font-bold">
            <span className="text-gray-900 p-2">StudentName: {name} </span>
            <span className="text-gray-900 p-2">StudentID: {id} </span>
            <span className="text-gray-900 p-2">Update Marks</span>
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
                className="border rounded-md p-5 w-20 mt-1"
              />
              {subject1Marks < 0 || subject1Marks > 10 ? (
                <p className="text-red-500 text-xs">
                  Marks should be between 0 and 10.
                </p>
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
                className="border rounded-md p-5 w-20 mt-1"
              />
              {subject2Marks < 0 || subject2Marks > 10 ? (
                <p className="text-red-500 text-xs">
                  Marks should be between 0 and 10.
                </p>
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
                className="border rounded-md p-5 w-20 mt-1"
              />
              {subject3Marks < 0 || subject3Marks > 10 ? (
                <p className="text-red-500 text-xs">
                  Marks should be between 0 and 10.
                </p>
              ) : null}
            </div>
            <button
              onClick={handleEnterMarks} 
              type="button"
              className="bg-green-500 text-white py-3 px-3 rounded-md m-5"
            >
              Enter
            </button>

            <div className="flex flex-col items-center">
              <button
                className="bg-red-500 text-white py-3 px-3 rounded-md m-5"
                onClick={handleRemove}
              >
                Remove
              </button>
            </div>
          </div>
          <p className="text-gray-900 font-bold mt-3">
            Total Marks: {totalMarks !== null ? totalMarks : 'Loading...'}
          </p>
        </div>
      </div>
    </>
  );
};

export default StudentDetails;
