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
    <tr>
      <td className="border px-4 py-2">{name}</td>
      <td className="border px-4 py-2">{id}</td>
      <td className="border px-4 py-2">
        <input
          type="number"
          value={subject1Marks}
          onChange={(e) =>
            handleSubjectMarksChange(setSubject1Marks, parseInt(e.target.value))
          }
          className="border rounded-md py-2 px-4 w-full text-center bg-white text-black"
        />
      </td>
      <td className="border px-4 py-2">
        <input
          type="number"
          value={subject2Marks}
          onChange={(e) =>
            handleSubjectMarksChange(setSubject2Marks, parseInt(e.target.value))
          }
          className="border rounded-md py-2 px-4 w-full text-center bg-white text-black"
        />
      </td>
      <td className="border px-4 py-2">
        <input
          type="number"
          value={subject3Marks}
          onChange={(e) =>
            handleSubjectMarksChange(setSubject3Marks, parseInt(e.target.value))
          }
          className="border rounded-md py-2 px-4 w-full text-center bg-white text-black"
        />
      </td>
      <td className="border px-4 py-2">
        {totalMarks !== null ? totalMarks : "Loading..."}
      </td>
      <td className="border px-4 py-2">
        <button
          onClick={handleEnterMarks}
          type="button"
          className="bg-white text-black py-2 px-4 rounded-md mr-2"
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
      </td>
    </tr>
  );
};

export default StudentDetails;
