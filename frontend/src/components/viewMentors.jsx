import React from 'react';

const UserInfoCard = ({ name, email, id }) => {
  return (
    <div className="flex justify-center items-center p-2 ">
      <div className="bg-white shadow-md rounded-lg p-4 w-100">
        <p className="text-gray-700 text-sm font-bold">
          <span className="text-gray-900 p-5">Mentor Name: {name} </span>
          <span className="text-gray-900 p-5">Email: {email} </span>
          <span className="text-gray-900 p-5">MentorID: {id} </span>
        </p>
      </div>
    </div>
  );
};

export default UserInfoCard;
