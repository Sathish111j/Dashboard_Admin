import React, { useState, useEffect } from 'react';
import UserInfoCardtoassign from './../components/unassignedstudents.jsx';

const UStudents = ({ mentorId, setUnassignedStudents, unassignedStudents }) => {
  return (
    <div className="bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Unassigned Students</h2>

      {unassignedStudents.map((student) => (
        <UserInfoCardtoassign
          key={student.id}
          name={student.name}
          email={student.email}
          id={student.id}
          mentorId={mentorId}
          setUnassignedStudents={setUnassignedStudents}
        />
      ))}
    </div>
  );
};

export default UStudents;
