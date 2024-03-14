import React, { useState, useEffect } from 'react';
import UserInfoCardtoassign from './../components/unassignedstudents.jsx';
const UnassignedStudentsList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8787/students/unassigned')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error fetching unassigned students:', error));
    }, []);

    const handleCheckboxChange = (student) => {
        // handle checkbox change logic here if needed
        console.log('Checkbox changed for student:', student);
    };

    return (
        <>
            <h2 className="flex justify-center items-center p-2">Unassigned Students </h2>
            <div className="flex justify-center items-center p-2 ">
                {students.map(student => (
                    <UserInfoCardtoassign
                        key={student.id}
                        id={student.id}
                        name={student.name}
                        email={student.email}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                ))}
            </div>
        </>
    );
};

export default UnassignedStudentsList;
