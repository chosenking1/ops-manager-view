import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import apiUrl from '../../apiConfig';
import Image from "../../img/noun-electric-meter-4213733.svg";


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
          <div className='pl-3 bg-dashboad-grid1  h-32'>
            <img width={70}
            height={70}
            className="h-10 w-10 rounded-full "
            src = {Image}
            alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Total Customer</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
            height={70}
            className="h-10 w-10 rounded-full "
            src = {Image}
            alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Total Customer</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
            height={70}
            className="h-10 w-10 rounded-full "
            src = {Image}
            alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Total Customer</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
            height={70}
            className="h-10 w-10 rounded-full "
            src = {Image}
            alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Total Customer</p>
          </div>

          <div className='bg-dashboad-grid1'>
            <img width={70}
            height={70}
            className="h-10 w-10 rounded-full "
            src = {Image}
            alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Total Customer</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
            height={70}
            className="h-10 w-10 rounded-full "
            src = {Image}
            alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Total Customer</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
            height={70}
            className="h-10 w-10 rounded-full "
            src = {Image}
            alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Total Customer</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
            height={70}
            className="h-10 w-10 rounded-full "
            src = {Image}
            alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Total Customer</p>
          </div>

          <div className='bg-dashboad-grid1'>
            <img width={70}
            height={70}
            className="h-10 w-10 rounded-full "
            src = {Image}
            alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Total Customer</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
            height={70}
            className="h-10 w-10 rounded-full "
            src = {Image}
            alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Total Customer</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
            height={70}
            className="h-10 w-10 rounded-full "
            src = {Image}
            alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Total Customer</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
            height={70}
            className="h-10 w-10 rounded-full "
            src = {Image}
            alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Total Customer</p>
          </div>

          <div className='bg-dashboad-grid1'>
            <img width={70}
            height={70}
            className="h-10 w-10 rounded-full "
            src = {Image}
            alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Total Customer</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
            height={70}
            className="h-10 w-10 rounded-full "
            src = {Image}
            alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Total Customer</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
            height={70}
            className="h-10 w-10 rounded-full "
            src = {Image}
            alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Total Customer</p>
          </div>
          <div className='bg-dashboad-grid1'>
            <img width={70}
            height={70}
            className="h-10 w-10 rounded-full "
            src = {Image}
            alt="avatar-img"></img>
            <p>2,452,523</p>
            <p>Total Customer</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
