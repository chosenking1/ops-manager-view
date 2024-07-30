import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiClient from '../../../helpers/ApiClient';
import { allLinks } from '../../../helpers/LinkDetails';

const RegisterUser = () => {
    const [pageName, setPageName] = useState('');
    const location = useLocation();
    const navigate = useNavigate(); // Moved useNavigate out of handleSubmit for proper usage

    useEffect(() => {
        // Find the current page name based on the current location pathname
        const currentPageObj = allLinks.find(link => link.link === location.pathname);
        setPageName(currentPageObj ? currentPageObj.name : 'Unknown');
    }, [location.pathname]); // Added dependency array to avoid endless re-renders

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {};
        new FormData(e.target).forEach((value, key) => {
            formData[key] = value;
        });

        // Create an instance of ApiClient with the provided parameters
            const apiClient = new ApiClient({
                url: '/api/users',
                method: 'post',
                headers: {
                    'disco': 'root',
                },
                data: formData,
                
            
            onSuccess: (data) => {
                
                console.log('User registered successfully:', data);
                navigate('/user-management'); // Redirect to the user management page
            },
             onError: (error) => {
                console.error('An error occurred while saving', error)
            },
            });
            apiClient.fetchData();
           
        
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <div>
                <h2 className="text-xl flex-col font-semibold mb-4">{pageName}</h2>
            </div>
            <div className="bg-white p-6 px-12 mx-28 me-8 rounded-lg w-full">
                <form onSubmit={handleSubmit}>
                    <div className='grid gap-4 grid-cols-3 grid-rows-3'>
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name:</label>
                            <input type="text" id="firstName" name="firstName" className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name:</label>
                            <input type="text" id="lastName" name="lastName" className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number:</label>
                            <input type="text" id="phoneNumber" name="phoneNumber" className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address:</label>
                            <input type="text" id="email" name="email" className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Username:</label>
                            <input type="text" id="userName" name="userName" className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                            <input type="password" id="password" name="password" className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City:</label>
                            <input type="text" id="city" name="city" className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State:</label>
                            <input type="text" id="state" name="state" className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lga" className="block text-sm font-medium text-gray-700">LGA:</label>
                            <input type="text" id="lga" name="lga" className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2">Submit</button>
                        <button type="button" onClick={() => navigate('/user-management')} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterUser;
