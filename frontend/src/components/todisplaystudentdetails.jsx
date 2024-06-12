import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentDetails = ({ name, id, setStudents, mentorId, isLocked, setMarksUpdated }) => {
  const [subject1Marks, setSubject1Marks] = useState(0);
  const [subject2Marks, setSubject2Marks] = useState(0);
  const [subject3Marks, setSubject3Marks] = useState(0);
  const [totalMarks, setTotalMarks] = useState(null);
  const [marksUpdatedLocally, setMarksUpdatedLocally] = useState(false);
  const handleSubjectMarksChange = (setter, value) => {
    if (value >= 0 && value <= 10) {
      setter(value);
    } else {
      setter(0);
    }
  };

  useEffect(() => {
    const fetchTotalMarks = async () => {
      try {
        const response = await fetch(`https://dashboardbackend.sathish333j.workers.dev/students/totalMarks/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch total marks');
        }
        const data = await response.json();
        setTotalMarks(data);
        if (marksUpdatedLocally) {
          setMarksUpdated(true); // Notify parent component of marks update
          setMarksUpdatedLocally(false); // Reset marks updated locally
        }
      } catch (error) {
        console.error('Error fetching total marks:', error);
      }
    };
  
    fetchTotalMarks();
  
    // No need to return a cleanup function since we're not setting up any ongoing processes
  }, [id, subject1Marks, subject2Marks, subject3Marks, marksUpdatedLocally]); // Include marksUpdatedLocally as a dependency

  const handleEnterMarks = async () => {
    try {
      const response = await axios.post(
        `https://dashboardbackend.sathish333j.workers.dev/marks`,
        {
          studentId: id,
          ideation: subject1Marks,
          execution: subject2Marks,
          viva: subject3Marks,
        }
      );
      console.log("Marks entered successfully:", response.data);
      setMarksUpdated(true);
  
      // Fetch the updated total marks after marks are entered
      fetch(`https://dashboardbackend.sathish333j.workers.dev/students/totalMarks/${id}`)
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
        "https://dashboardbackend.sathish333j.workers.dev/mentors/unassign",
        {
          studentId: id,
        }
      );
      console.log("Student unassigned successfully.");
  
      // Fetch the updated list of assigned students
      const response = await fetch(`https://dashboardbackend.sathish333j.workers.dev/mentors/${mentorId}/students`);
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
      <div className="bg-black text-white shadow-md rounded-lg p-6 w-full max-w-xl">
        <p className="text-gray-300 text-sm font-bold mb-4">
          <span className="block mb-2">Student Name: {name}</span>
          <span className="block mb-2">Student ID: {id}</span>
          <span className="block">Update Marks</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col items-center">
            <span className="mb-2">Ideation</span>
            <input
              type="number"
              value={subject1Marks}
              onChange={(e) =>
                handleSubjectMarksChange(setSubject1Marks, parseInt(e.target.value))
              }
              className="border rounded-md py-2 px-4 w-20 text-center bg-white text-black"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-2">Execution</span>
            <input
              type="number"
              value={subject2Marks}
              onChange={(e) =>
                handleSubjectMarksChange(setSubject2Marks, parseInt(e.target.value))
              }
              className="border rounded-md py-2 px-4 w-20 text-center bg-white text-black"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-2">Viva/Pitch</span>
            <input
              type="number"
              value={subject3Marks}
              onChange={(e) =>
                handleSubjectMarksChange(setSubject3Marks, parseInt(e.target.value))
              }
              className="border rounded-md py-2 px-4 w-20 text-center bg-white text-black"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleEnterMarks}
            type="button"
            className="bg-white text-black py-2 px-4 rounded-md mr-4"
            disabled={isLocked}
          >
            Enter
          </button>
          <button
            onClick={handleRemove}
            className="bg-white text-black py-2 px-4 rounded-md"
          >
            Remove
          </button>
        </div>
        <p className="text-gray-300 font-bold mt-4">
          Total Marks: {totalMarks !== null ? totalMarks : "Loading..."}
        </p>
      </div>
    </div>
  );
};
export default StudentDetails;
