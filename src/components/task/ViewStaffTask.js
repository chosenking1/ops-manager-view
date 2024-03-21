import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import apiUrl from '../../apiConfig';


function ViewStaffTask() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  axios.defaults.baseURL = apiUrl;

  useEffect(() => {
    fetchStaffTasks();
  }, []);



  const fetchStaffTasks = () => {
    const token = localStorage.getItem('token');

    axios
      .get('/api/task', {
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then(response => {
        setTasks(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching staff tasks:', error);
      });
  };

  const viewTask = taskId => {
    navigate(`/task/${taskId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
      {tasks.length > 0 ? (
        <ul className="space-y-4">
          {tasks.map(task => (
            <li key={task.id} className="bg-gray-100 p-4 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold mb-2">{task.attributes.name}</h3>
                <p className="text-gray-600 mb-2">{task.attributes.description}</p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => viewTask(task.id)}
                >
                  View Task
                </button>

              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
}

export default ViewStaffTask;
