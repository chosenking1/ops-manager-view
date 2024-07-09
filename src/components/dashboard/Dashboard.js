import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import apiUrl from '../../apiConfig';
import Image from "../../img/noun-electric-meter-4213733.svg";
import { useAuth } from '../userauth/AuthContext';
import Postpaid from "../../img/postpaid.jpg";
import Prepaid from "../../img/meter.jpg";
import Users from "../../img/users.jpg";


function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  axios.defaults.baseURL = apiUrl;


  const fetchStaffTasks = () => {
    const token = sessionStorage.getItem('token');

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
    <div className="mx-6 bg-dashboad-top">
      <div className="flex bg-dashboad-top justify-between my-6 p-8 h-36 place-items-center shadow-2xl rounded-3xl p-10">
        <div className=' '>
          <p>Good Morning</p>
          <h3>Welcome back, Sade Williams</h3>
        </div>
        <div className=''>
          <p className='flex justify-end'>10:30 am</p>
          <p> Monday 12th February, 2024</p>
        </div>
      </div>
      <div>
        <div className='flex grid grid-rows-4 grid-flow-col gap-5  bg-white shadow-2xl rounded-3xl p-10  '>
          <div className='pl-3 bg-dashboad-grid1 ml-1 pt-3 h-32'>
            <img
              className="h-11 w-16 "
              src={Users}
              alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Total Customer</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
              height={70}
              className="h-11 w-16 rounded-full "
              src={Users}
              alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Last Month Total Bill</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
              height={70}
              className="h-11 w-16 rounded-full "
              src={Users}
              alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Last Month Total Collection</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
              height={70}
              className="h-11 w-16 rounded-full "
              src={Users}
              alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Active Customer</p>
          </div>

          <div className='bg-dashboad-grid1'>
            <img width={70}
              height={70}
              className="h-11 w-16 rounded-full "
              src={Users}
              alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>This Month Total Collection</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
              height={70}
              className="h-11 w-16 rounded-full "
              src={Prepaid}
              alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Prepaid Customers</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
              height={70}
              className="h-11 w-16 rounded-full "
              src={Postpaid}
              alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Postpaid Customers</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
              height={70}
              className="h-11 w-16 rounded-full "
              src={Users}
              alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>MD Customers</p>
          </div>

          <div className='bg-dashboad-grid1'>
            <img width={70}
              height={70}
              className="h-11 w-16 rounded-full "
              src={Users}
              alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>NMD Customer</p>
          </div>

          <div className='bg-dashboad-grid1'>
            <img width={70}
              height={70}
              className="h-11 w-16 rounded-full "
              src={Users}
              alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Postpaid NMD Customer</p>
          </div>


          <div className='bg-dashboad-grid1'>
            <img width={70}
              height={70}
              className="h-11 w-16 rounded-full "
              src={Users}
              alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Suspended Customer</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
              height={70}
              className="h-11 w-16 rounded-full "
              src={Users}
              alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Inactive Customer</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
              height={70}
              className="h-11 w-16 rounded-full "
              src={Users}
              alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Total DSS</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
