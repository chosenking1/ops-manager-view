// SearchModal.js

import React, { useState } from 'react';

const SearchModal = ({ isOpen, onClose, search }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your filtering logic here
        const formData = {};
        new FormData(e.target).forEach((value, key) => {
            formData[key] = value;
        });
        // You can pass filters state to the parent component or handle filtering directly here
        search(formData);
        
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
                            <input type="text" id="region" name="region"   className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="hub" className="block text-sm font-medium text-gray-700">Hub:</label>
                            <input type="text" id="hub" name="hub"   className="mt-1 p-2 border rounded-md w-full" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="serviceCenter" className="block text-sm font-medium text-gray-700">Service Center:</label>
                            <input type="text" id="serviceCenter" name="serviceCenter"   className="mt-1 p-2 border rounded-md w-full" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Customer Name:</label>
                            <input type="text" id="name" name="name"   className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number:</label>
                            <input type="text" id="phoneNumber" name="phoneNumber"   className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">Account No :</label>
                            <input type="text" id="accountNumber" name="accountNumber"   className="mt-1 p-2 border rounded-md w-full" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="meterNumber" className="block text-sm font-medium text-gray-700">Meter Number :</label>
                            <input type="text" id="meterNumber" name="meterNumber"   className="mt-1 p-2 border rounded-md w-full" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address:</label>
                            <input type="text" id="email" name="email"   className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
                            <input type="text" id="status" name="status"   className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">Account Type:</label>
                            <input type="text" id="accountType" name="accountType"   className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="customerType" className="block text-sm font-medium text-gray-700">Customer Type:</label>
                            <input type="text" id="customerType" name="customerType"   className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="serviceBand" className="block text-sm font-medium text-gray-700">Service Band:</label>
                            <input type="text" id="serviceBand" name="serviceBand"   className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="notPaidMonthAgo" className="block text-sm font-medium text-gray-700">Not Paid(Month ago):</label>
                            <input type="text" id="notPaidMonthAgo" name="notPaidMonthAgo"   className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="notPaidBetweenStartDate" className="block text-sm font-medium text-gray-700">Not Paid Between(StartDate):</label>
                            <input type="text" id="notPaidBetweenStartDate" name="notPaidBetweenStartDate"   className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="notPaidBetweenEndDate" className="block text-sm font-medium text-gray-700">Not Paid Between(EndDate) :</label>
                            <input type="text" id="notPaidBetweenEndDate" name="notPaidBetweenEndDate"   className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="currentBillPayment" className="block text-sm font-medium text-gray-700">Current Bill Payment:</label>
                            <input type="text" id="currentBillPayment" name="currentBillPayment"   className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dtAssetId" className="block text-sm font-medium text-gray-700">Current DT Asset Id:</label>
                            <input type="text" id="dtAssetId" name="dtAssetId"   className="mt-1 p-2 border rounded-md w-full" />
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
