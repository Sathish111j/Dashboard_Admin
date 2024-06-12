import React from 'react';

const UserInfoCard = ({ name, email, id }) => {
  return (
    <div className="flex justify-center items-center p-2">
      <div className="bg-black text-white shadow-md rounded-lg p-4">
        <p className="text-gray-300  text-sm font-bold">
          <span className="block mb-2">Name: {name}</span>
          <span className="block mb-2">Email: {email}</span>
          <span className="block">ID: {id}</span>
        </p>
      </div>
    </div>
  );
};

export default UserInfoCard;
