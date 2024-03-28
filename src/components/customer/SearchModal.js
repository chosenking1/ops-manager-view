// SearchModal.js

import React, { useState } from 'react';

const SearchModal = ({ isOpen, onClose }) => {
    const [filters, setFilters] = useState({
        region: '',
        hub: '',
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
        onClose();
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white p-6 px-12 mx-28 me-8 rounded-lg w-full">
                <h2 className="text-xl flex-col font-semibold mb-4">Search</h2>
                <form onSubmit={handleSubmit}>
                    <div className='grid gap-4 grid-cols-3 grid-rows-3'>
                        <div className="mb-4">
                            <label htmlFor="region" className="block text-sm font-medium text-gray-700">Region:</label>
                            <input type="text" id="region" name="region" value={filters.region} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="hub" className="block text-sm font-medium text-gray-700">Hub:</label>
                            <input type="text" id="hub" name="hub" value={filters.hub} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="region" className="block text-sm font-medium text-gray-700">Customer Name:</label>
                            <input type="text" id="region" name="region" value={filters.region} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="hub" className="block text-sm font-medium text-gray-700">Phone Number:</label>
                            <input type="text" id="hub" name="hub" value={filters.hub} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="region" className="block text-sm font-medium text-gray-700">Account No / Meter No:</label>
                            <input type="text" id="region" name="region" value={filters.region} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="hub" className="block text-sm font-medium text-gray-700">Email address:</label>
                            <input type="text" id="hub" name="hub" value={filters.hub} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="region" className="block text-sm font-medium text-gray-700">Status:</label>
                            <input type="text" id="region" name="region" value={filters.region} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="hub" className="block text-sm font-medium text-gray-700">Account Type:</label>
                            <input type="text" id="hub" name="hub" value={filters.hub} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="hub" className="block text-sm font-medium text-gray-700">Customer Type:</label>
                            <input type="text" id="hub" name="hub" value={filters.hub} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="hub" className="block text-sm font-medium text-gray-700">Service Band:</label>
                            <input type="text" id="hub" name="hub" value={filters.hub} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="region" className="block text-sm font-medium text-gray-700">Not Paid(Month ago):</label>
                            <input type="text" id="region" name="region" value={filters.region} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="hub" className="block text-sm font-medium text-gray-700">Not Paid Between:</label>
                            <input type="text" id="hub" name="hub" value={filters.hub} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="hub" className="block text-sm font-medium text-gray-700">Current Bill Payment:</label>
                            <input type="text" id="hub" name="hub" value={filters.hub} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                    </div>
                    {/* Add more input fields for other filters */}
                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2">Search</button>
                        <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SearchModal;
