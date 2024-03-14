import React, { useState } from 'react';
import axios from 'axios';

const UserInfoCardtoassign = ({ name, email, id ,mentorId}) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const handleAddButtonClick = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8787/mentors/assign",
                {
                    mentorId: mentorId,
                    studentId: id
                }
            );
            console.log("Student assigned successfully:", response.data);
            // Perform any further actions after successful assignment
        } catch (error) {
            console.error("Error assigning student:", error);
            setErrorMessage("Error assigning student. Please try again.");
            // Handle errors
        }
    };

    return (
        <>
            <div className="flex flex-row-2 justify-center items-center p-2 ">
                <div className="bg-white shadow-md rounded-lg p-4 w-100">
                    <p className="text-gray-700 text-sm font-bold">
                        <span className="text-gray-900 p-5">Student Name: {name} </span>
                        <span className="text-gray-900 p-5">StudentID: {id} </span>
                        <button
                            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
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
