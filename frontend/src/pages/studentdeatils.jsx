import React, { useState, useEffect } from 'react';
import UserInfoCard from './../components/viewStudent.jsx';
import { NavbarSimple as Header } from '../components/header.jsx';

const MentorInfo = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    fetch('https://dashboardbackend.sathish333j.workers.dev/students/all')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://dashboardbackend.sathish333j.workers.dev/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        setStudents([...students, data]);
        setFormData({ name: '', email: '' }); // Reset form after successful submission
      })
      .catch(error => console.error('Error adding student:', error));
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Add a New Student</h2>
          <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg">
            <div className="mb-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            >
              Add Student
            </button>
          </form>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {students.map(student => (
            <UserInfoCard
              key={student.id}
              name={student.name}
              email={student.email}
              id={student.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorInfo;
