import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import apiUrl from '../../apiConfig';

function EditTask() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  axios.defaults.baseURL = apiUrl;

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`/api/task/${id}`, {
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setTask(response.data.data);
        setName(response.data.data.attributes.name);
        setDescription(response.data.data.attributes.description);
        setStatus(response.data.data.attributes.status);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const handleSave = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const updatedTask = {
      ...task,
      name,
      description,
      status
    };
    axios
      .patch(`/api/task/${id}`, updatedTask, {
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        navigate(`/task/${id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-full max-w-md bg-gradient-to-b from-blue-800 to-black rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-white">Edit Task</h1>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 text-white" htmlFor="name">
              Task Name
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white bg-gray-900"
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
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
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter description"
              required
              style={{ minHeight: '150px' }}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 text-white" htmlFor="status">
              Status
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-white bg-gray-900"
              id="status"
              value={status}
              onChange={e => setStatus(e.target.value)}
              required
            >
              <option value="">Select status</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
          <button
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
