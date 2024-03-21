import React, { useState } from 'react';
import axios from 'axios';
import apiUrl from '../../apiConfig';


const Customer = () => {
  const [dept_name, setDept_name] = useState('');
  axios.defaults.baseURL = apiUrl;

 

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      Customer Page
    </div>
  );
};

export default Customer;
