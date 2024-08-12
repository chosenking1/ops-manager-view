// SearchModal.js

import React, { useEffect, useState } from 'react';

const CreateNewTeam = ({ isOpen, onClose, clws }) => {
const [clwData, setClwData] = useState([])
// console.log('CLWs:', clws);
    useEffect(() => {   
        if (clws){
            // console.log('CLWs:', clws);
           setClwData(clws)
           console.log( clwData);
        }}, [clws]);
    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your filtering logic here
        const formData = {};
        new FormData(e.target).forEach((value, key) => {
            formData[key] = value;
        });
        // You can pass filters state to the parent component or handle filtering directly here
        // search(formData);

        onClose();
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white p-6 px-12 mx-28 me-8 rounded-lg ">
                <h2 className="text-xl flex-col font-semibold mb-4">Create Team</h2>
                <form onSubmit={handleSubmit}>
                    <div className='table '>
                        <div className="">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                            <input type="text" id="name" name="name" className="mt-1 p-2 border rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                            <input type="text" id="description" name="description" className="mt-1 p-2 border rounded-md w-full" />
                        </div>

                        <div >
                            <select className="w-96 h-12 input-field border-4 border-gray-700 border-dotted" name="staffMembersIds">
                                <option value="">Select Staff to Add</option>
                                {clwData.map((clw) => (
                                    <option key={clw.id} value={`${clw.firstName} ${clw.lastName}`}>
                                        {clw.firstName} {clw.lastName }
                                    </option>
                                ))}
                            </select>
                        </div>

                        


                    </div>
                    {/* Add more input fields for other filters */}
                    <div className="flex justify-center my-5">
                        <button type="submit" className="w-72 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2">Create</button>
                        {/* <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button> */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNewTeam;
