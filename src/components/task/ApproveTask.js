import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../../apiConfig';

function ApproveTask() {
   const { id } = useParams();
   const [task, setTask] = useState(null);
   const navigate = useNavigate();
   axios.defaults.baseURL = apiUrl;

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to the login page if the user is not authenticated
        navigate('/');
      }
    };

  const fetchTask = () => {
    const token = localStorage.getItem('token');
    axios.get(`/api/task/${id}`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => {
      setTask(response.data.data);
    })
    .catch(error => {
      console.log(error);
    });
  };

    checkAuthentication();
    fetchTask();
  }, [id, navigate]);
console.log('sending..', task)

 const handleApprove = () => {
  const token = localStorage.getItem('token');

  const updatedTask = {
      ...task,
      approved: 1 };
  axios
    .patch(`/api/task/${id}`, updatedTask, {
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      navigate(`/task/${id}`);
    })
    .catch((error) => {
      console.log(error);
    });
  setTask(updatedTask); // Update the task state with the new approved value
};

const handleReject = () => {
  const token = localStorage.getItem('token');

  const updatedTask = { ...task, approved: false };
  axios
    .patch(`/api/task/${id}`, updatedTask, {
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      navigate(`/task/${id}`);
    })
    .catch((error) => {
      console.log(error);
    });
  setTask(updatedTask); // Update the task state with the new approved value
};


  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-full max-w-md bg-gradient-to-b from-blue-800 to-black rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-white">Approve Task</h1>
        {task && (
          <>
            <p className="text-lg font-bold mb-2 text-white">Task ID: {id}</p>
            <p className="text-lg font-bold mb-2 text-white">Task Name: {task.name}</p>
            <p className="text-lg font-bold mb-2 text-white">Description: {task.description}</p>
            <div className="mb-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow mr-4"
                onClick={handleApprove}
              >
                Approve
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow"
                onClick={handleReject}
              >
                Reject
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ApproveTask;
