import React from 'react';
import axios from 'axios';

const UserInfoCardtoassign = ({ name, email, id, mentorId, setUnassignedStudents }) => {
  const handleAddButtonClick = async () => {
    try {
      const response = await axios.post(
        "https://dashboardbackend.sathish333j.workers.dev/mentors/assign",
        {
          mentorId: mentorId,
          studentId: id
        }
      );
      console.log("Student assigned successfully:", response.data);

      // Update the list of unassigned students
      if (setUnassignedStudents) {
        const unassignedResponse = await fetch('https://dashboardbackend.sathish333j.workers.dev/students/unassigned');
        if (!unassignedResponse.ok) {
          throw new Error('Failed to fetch unassigned students');
        }
        const unassignedData = await unassignedResponse.json();
        setUnassignedStudents(unassignedData);
      }
    } catch (error) {
      console.error("Error assigning student:", error);
    }
  };

    return (
        <>
            <div className="flex flex-row-2 justify-center items-center p-2  bg-gray-900">
                <div className="bg-black text-white shadow-md rounded-lg p-4 w-100">
                    <p className="text-gray-300 text-sm font-bold">
                        <span className="text-white-900 p-5">Student Name: {name} </span>
                        <span className="text-white-900 p-5">StudentID: {id} </span>
                        <button
                            className="bg-white text-black font-bold py-2 px-4 rounded"
                            onClick={handleAddButtonClick}
                        >
                            Add
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
};

export default UserInfoCardtoassign;
