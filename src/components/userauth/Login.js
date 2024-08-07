
import React, { useState } from 'react';
import apiUrl from '../../apiConfig';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "./AuthContext";

function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  axios.defaults.baseURL = apiUrl;
  const [isLoading, setIsLoading] = useState(false); // State for loading


  const handleSignIn = (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading to true before login process
    const formData = new FormData(event.target);

    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    axios
      .post('/api/auth/login', credentials,
        {
          headers: {
            'Accept': 'application/vnd.api+json',
            'disco': 'root',
            'Content-Type': 'application/vnd.api+json',
          }
        })
      .then((response) => {
        // console.log(response);
        const token = response.data.data.token;
        sessionStorage.setItem("token", token);
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false after login process is completed
      });
  };

  return (
    <div className="antialiased bg-slate-900 ">
      <div className=" min-h-screen flex flex-col  bg-gray-100 sm:justify-center items-center">


        <div className="w-1/3 rounded-3xl pl-28 items-left flex-col flex shadow-2xl bg-white">

          <div className="justify-left items-start mt-20 mb-8 ">
            <h1 className="text-lg font-semibold text-gray-800">Welcome Back</h1>
            <p className="font-normal text-base text-gray-500">Enter your details below to login</p>
          </div>
          <form className="space-y-4 mt-4  mb-14 w-4/5" onSubmit={handleSignIn}>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-login-text-color mb-1">Email</label>
              <input type="email" id="email" name="email" autoComplete="email" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 bg-white" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-login-text-color mb-1">Password</label>
              <input type="password" id="password" name="password" autoComplete="current-password" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 bg-white" />
            </div>
            <div className="flex items-center justify-between ">
              <div className="flex items-center">
                <input type="checkbox" name="remember" id="remember" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-w-1" />
                <label htmlFor="remember" className="text-sm ml-2 text-gray-700">Remember me</label>
              </div>
              <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-custom-blue hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-opacity-50 text-center text-white font-medium rounded-md text-sm shadow sm:shadow-sm">
              {isLoading ? (
                'Loading...'
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;
