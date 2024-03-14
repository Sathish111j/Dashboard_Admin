import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentDetails = ({ name, id, setStudents, mentorId, isLocked }) => {
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
      .then((response) => response.json())
      .then((data) => setTotalMarks(data))
      .catch((error) => console.error("Error fetching total marks:", error));
  }, [id, subject1Marks, subject2Marks, subject3Marks]);

  const handleEnterMarks = async () => {
    try {
      const response = await axios.post(
        `https://backend.sathish333j.workers.dev/marks`,
        {
          studentId: id,
          ideation: subject1Marks,
          execution: subject2Marks,
          viva: subject3Marks,
        }
      );
      console.log("Marks entered successfully:", response.data);
  
      // Fetch the updated total marks after marks are entered
      fetch(`https://backend.sathish333j.workers.dev/students/totalMarks/${id}`)
        .then((response) => response.json())
        .then((data) => setTotalMarks(data))
        .catch((error) => console.error("Error fetching total marks:", error));
    } catch (error) {
      console.error("Error entering marks:", error);
    }
  };

  const handleRemove = async () => {
    try {
      await axios.post(
        "https://backend.sathish333j.workers.dev/mentors/unassign",
        {
          studentId: id,
        }
      );
      console.log("Student unassigned successfully.");
  
      // Fetch the updated list of assigned students
      const response = await fetch(`https://backend.sathish333j.workers.dev/mentors/${mentorId}/students`);
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error("Error unassigning student:", error);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl">
        <p className="text-gray-700 text-sm font-bold mb-4">
          <span className="block text-gray-900 mb-2">Student Name: {name}</span>
          <span className="block text-gray-900 mb-2">Student ID: {id}</span>
          <span className="block text-gray-900">Update Marks</span>
        </p>
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <span className="mb-2">Ideation</span>
            <input
              type="number"
              value={subject1Marks}
              onChange={(e) =>
                handleSubjectMarksChange(
                  setSubject1Marks,
                  parseInt(e.target.value)
                )
              }
              className="border rounded-md py-2 px-4 w-20 text-center"
            />
            {subject1Marks < 0 || subject1Marks > 10 ? (
              <p className="text-red-500 text-xs mt-2">
                Marks should be between 0 and 10.
              </p>
            ) : null}
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-2">Execution</span>
            <input
              type="number"
              value={subject2Marks}
              onChange={(e) =>
                handleSubjectMarksChange(
                  setSubject2Marks,
                  parseInt(e.target.value)
                )
              }
              className="border rounded-md py-2 px-4 w-20 text-center"
            />
            {subject2Marks < 0 || subject2Marks > 10 ? (
              <p className="text-red-500 text-xs mt-2">
                Marks should be between 0 and 10.
              </p>
            ) : null}
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-2">Viva/Pitch</span>
            <input
              type="number"
              value={subject3Marks}
              onChange={(e) =>
                handleSubjectMarksChange(
                  setSubject3Marks,
                  parseInt(e.target.value)
                )
              }
              className="border rounded-md py-2 px-4 w-20 text-center"
            />
            {subject3Marks < 0 || subject3Marks > 10 ? (
              <p className="text-red-500 text-xs mt-2">
                Marks should be between 0 and 10.
              </p>
            ) : null}
          </div>
          <button
            onClick={handleEnterMarks}
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded-md ml-4"
            disabled={isLocked}
          >
            Enter
          </button>
          <button
            onClick={handleRemove}
            className="bg-red-500 text-white py-2 px-4 rounded-md ml-4"
          >
            Remove
          </button>
        </div>
        <p className="text-gray-900 font-bold mt-4">
          Total Marks: {totalMarks !== null ? totalMarks : "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default StudentDetails;
