import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../../apiConfig';

const CreateTask = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  axios.defaults.baseURL = apiUrl;

  const handleCreateTask = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const createdTask = {
      name,
      description,
    };
    axios
      .post(`/api/task`, createdTask, {
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log('Task created:', response.data);
        navigate(`/task`);
      })
      .catch(error => {
        console.log(error);
      });

    // Reset form fields
    setName('');
    setDescription('');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-400">
      <div className="w-full max-w-md bg-gradient-to-b from-blue-800 to-black rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-white">Create Task</h1>
        <form onSubmit={handleCreateTask}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 text-white" htmlFor="name">
              Task Name
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white bg-gray-900"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter task name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 text-white" htmlFor="description">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white bg-gray-900"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              required
              style={{ minHeight: '150px' }}
            ></textarea>
          </div>
          <button
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
