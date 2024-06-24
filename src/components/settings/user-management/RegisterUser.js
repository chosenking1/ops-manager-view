import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { allLinks } from '../../../helpers/LinkDetails';

const RegisterUser = () => {
    const [pageName, setPageName] = useState('');
    const location = useLocation();

    useEffect(() => {
        // Find the current page name based on the current location pathname
        const currentPageObj = allLinks.find(link => link.link === location.pathname);
        setPageName(currentPageObj ? currentPageObj.name : 'Unknown');
    })

    const [filters, setFilters] = useState({
        firstName: '',
        middleName: '',
        // Add more filter fields as needed
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your filtering logic here
        // You can pass filters state to the parent component or handle filtering directly here
        console.log('Filters:', filters);

    };

    return (
        <div className=' flex flex-col items-center justify-center '>
            <div>

                <h2 className="text-xl flex-col font-semibold mb-4">{pageName}</h2>
            </div>
            <div className="bg-white p-6 px-12 mx-28 me-8 rounded-lg w-full">

                <form onSubmit={handleSubmit}>
                    <div className='grid gap-4 grid-cols-3 grid-rows-3'>
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name:</label>
                            <input type="text" id="firstName" name="firstName" value={filters.firstName} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Middle Name:</label>
                            <input type="text" id="middleName" name="middleName" value={filters.middleName} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name:</label>
                            <input type="text" id="lastName" name="lastName" value={filters.lastName} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number:</label>
                            <input type="text" id="phoneNumber" name="phoneNumber" value={filters.phoneNumber} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address:</label>
                            <input type="text" id="email" name="email" value={filters.email} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="staffId" className="block text-sm font-medium text-gray-700">Staff Id:</label>
                            <input type="text" id="staffId" name="staffId" value={filters.staffId} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                            <input type="text" id="password" name="password" value={filters.password} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
                            <input type="text" id="confirmPassword" name="confirmPassword" value={filters.confirmPassword} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date Of Birth:</label>
                            <input type="date" id="dateOfBirth" name="dateOfBirth" value={filters.dateOfBirth} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">Employment Type:</label>
                            <input type="text" id="employmentType" name="employmentType" value={filters.employmentType} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="division" className="block text-sm font-medium text-gray-700">Division:</label>
                            <input type="text" id="division" name="division" value={filters.division} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">Account Type:</label>
                            <input type="text" id="accountType" name="accountType" value={filters.accountType} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className=" w-full flex justify-between items-center ">
                            
                            <div className="mb-4 flex w-full">
                                <input type="radio" id="headquarters" name="headquarters" value={filters.headquarters} onChange={handleChange} className="mt-1 p-2 border rounded-md " />
                                <label htmlFor="headquarters"  className="block text-sm font-medium text-gray-700 w-full">Headquarters:</label>
                            </div>

                            <div className="mb-4 flex w-full">
                                <input type="radio" id="region" name="region" value={filters.region} onChange={handleChange} className="mt-1 p-2 border rounded-md " />
                                <label htmlFor="region" for="region" className="block text-sm font-medium text-gray-700">Region:</label>
                            </div>

                            <div className="mb-4 flex  w-full">
                                <input type="radio" id="businessHub" name="businessHub" value={filters.businessHub} onChange={handleChange} className="mt-1 p-2 border rounded-md" />
                                <label htmlFor="businessHub" for="businessHub" className="block text-sm font-medium text-gray-700">Business Hub:</label>
                            </div>

                            <div className="mb-4 flex w-full">
                                <input type="radio" id="serviceCenter" name="serviceCenter" value={filters.serviceCenter} onChange={handleChange} className="mt-1 p-2 border rounded-md " />
                                <label htmlFor="serviceCenter" for="serviceCenter" className="block text-sm font-medium text-gray-700 w-full">Service Center:</label>
                            </div>
                        </div>

                    
                    

                        <div className="mb-4">
                            <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Current Bill Payment:</label>
                            <input type="text" id="middleName" name="middleName" value={filters.middleName} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                    </div>
                    {/* Add more input fields for other filters */}
                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2">Search</button>
                        <button type="button" onClick={''} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterUser;
