import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import apiUrl from '../../apiConfig';


function Dashboard() {
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
    <div className="">
      Dashboard dan show
    </div>
  );
}

export default Dashboard;
