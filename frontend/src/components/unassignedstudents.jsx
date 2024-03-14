import React, { useState } from 'react';

const UserInfoCardtoassign = ({ name, email, id, handleCheckboxChange }) => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckboxChange = () => {
        setIsChecked(!isChecked);
        handleCheckboxChange({ name, email, id, isChecked: !isChecked });
    };

    return (
        <>
           
            <div className="flex flex-col justify-center items-center p-2 ">
                <div className="bg-white shadow-md rounded-lg p-4 w-100">
                    <p className="text-gray-700 text-sm font-bold">
                        <span className="text-gray-900 p-5">Student Name: {name} </span>
                        <span className="text-gray-900 p-5">StudentID: {id} </span>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={toggleCheckboxChange}
                        />
                    </p>
                </div>
            </div>
        </>
    );
};

export default UserInfoCardtoassign;
