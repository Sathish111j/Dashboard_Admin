import React from 'react';
import { Link } from 'react-router-dom';

const UserInfoCard = ({ name, email, id }) => {
  return (
    <div className="flex justify-center items-center p-2">
      <div className="bg-black text-white shadow-md rounded-lg p-4 w-100">
        <p className=" flex text-white text-sm font-bold justify-center">
          <Link to={`/mentors/${id}/students`}>
            <div className=''>
            <span className="text-white p-5">{name}</span>
            <span className="text-white p-5">ID:{id}</span>
            <br />
          <br />
          <p>
            manage students
          </p>
            </div>
            
          </Link>
          
        </p>
      </div>
    </div>
  );
};

export default UserInfoCard;
