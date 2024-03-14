import React, { useState, useEffect } from 'react';
import UserInfoCard from './../components/mentornamesbutton.jsx';
import { NavbarSimple as Header } from '../components/header.jsx';
const MentorInfo = () => {
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8787/mentors/all')
            .then(response => response.json())
            .then(data => setMentors(data))
            .catch(error => console.error('Error fetching mentors:', error));
    }, []);

    return (
        <div>
            <Header />
            {mentors.map(mentor => (
                <div key={mentor.id}>
                    <UserInfoCard
                        name={mentor.name}
                        email={mentor.email}
                        id={mentor.id}
                    />
                </div>
            ))}
        </div>
    );
};

export default MentorInfo;
