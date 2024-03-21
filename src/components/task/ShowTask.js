import { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate, useParams, Link,} from "react-router-dom";
import apiUrl from '../../apiConfig';

function ShowTask() {
    const {id} = useParams();
    const [task, setTask] = useState(null);
    const navigate = useNavigate();
    axios.defaults.baseURL = apiUrl;

  useEffect(() => {
      const token = localStorage.getItem('token');
      axios.get(`/api/task/${id}`,
          {
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
  }, [id]);

 const handleDelete = () => {
    const token = localStorage.getItem('token');
    axios
      .delete(`/api/task/${id}`, {
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('Task deleted:', response.data);
        // Redirect to a different page after successful deletion
        navigate('/task');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const markAsCompleted = () => {
    const token = localStorage.getItem('token');
    const updatedTask = {
       ...task,
        status: 'completed'
    };

    axios
      .patch(`/api/task/${id}`, updatedTask, {
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
          navigate(`/task/${id}`)
      })
      .catch(error => {
        console.log(error);
      });
  };

  const markAsIncomplete = () => {
    const token = localStorage.getItem('token');
        const updatedTask = {
            ...task,
            status: 'incomplete'

    };

        console.log('Updating task:', updatedTask);
        axios
      .patch(`/api/task/${id}`, updatedTask, {
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
          console.log('Task updated:', response.data);
        navigate(`/task/${id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
   <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-full max-w-md bg-gradient-to-b from-blue-800 to-black rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-white">Task Details</h1>
        {task && (
          <div>
            <h2 className="text-lg font-bold mb-2 text-white">{task.attributes.name}</h2>
            <p className="text-blue-700 mb-2">{task.attributes.description}</p>
            <p
              className={`text-sm font-bold ${
                task.attributes.status === 'completed' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {task.attributes.status === 'completed' ? 'Completed' : 'Incomplete'}
            </p>
            {task.attributes.approved ? (
              <p className="text-sm font-bold text-green-500">Approved</p>
            ) : (
              <p className="text-sm font-bold text-red-500">Not Approved</p>
            )}
            <p className="text-sm text-gray-500">
              {new Date(task.attributes.created_at).toLocaleDateString()}
            </p>

            {!task.attributes.approved && (
              <>
                {task.attributes.status === 'completed' ? (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded mt-4 mr-2"
                    onClick={markAsIncomplete}
                  >
                    Mark as Incomplete
                  </button>
                ) : (
                  <button

                      className="bg-green-500 text-white px-4 py-2 rounded mt-4 mr-2"
                      onClick={markAsCompleted}
                  >
                    Mark as Completed
                  </button>
                )}
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" >
                  <Link to={`/task/${id}/edit`}>Edit Task</Link>
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded mt-4" onClick={handleDelete}>
                  Delete Task
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowTask;
