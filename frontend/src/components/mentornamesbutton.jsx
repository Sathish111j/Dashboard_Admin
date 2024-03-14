import React from 'react';
import { Link } from "react-router-dom"

const UserInfoCard = ({ name, email, id }) => {
  return (
    <div className="flex justify-center items-center p-2 ">
      <div className="bg-white shadow-md rounded-lg p-4 w-100">
        <p className="text-gray-700 text-sm font-bold">
          <Link to={`/mentors/${id}/students`}><span className="text-gray-900 p-5"> {name} </span></Link>
        </p>
      </div>
    </div>
  );
};

export default UserInfoCard;
