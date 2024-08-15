// SearchModal.js

import React, { useEffect, useState } from 'react';

const CreateNewTeam = ({ isOpen, onClose, technicalStaffs, createTeam }) => {
const [technicalStaffsData, setTechnicalStaffsData] = useState([])
// console.log('technicalStaffs:', technicalStaffs);
    useEffect(() => {   
        if (technicalStaffs){
            // console.log('technicalStaffs:', technicalStaffs);
           setTechnicalStaffsData(technicalStaffs)
           console.log( technicalStaffsData);
        }}, [technicalStaffs]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your filtering logic here
       
        const formData = new FormData(e.target);
       // Extract other form fields as needed
       const name = formData.get('name');
       const description = formData.get('description');
       
       // Extract selected CLW IDs
       const selectedCLWIds = formData.getAll('staffMembersIds');
       
       // Prepare data for team creation
       const teamData = {
           name: name,
           description: description
       };
       
       // Prepare data for adding members
       const membersData = {
           staffMemberIds: selectedCLWIds
       };
       
       // Call function to save team and add members
       createTeam(teamData, membersData);

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

                        <div className="mb-4 col-span-3">
                            <label htmlFor="staffMembersIds" className="block text-sm font-medium text-gray-700">Select Staff to Add:</label>
                            <select
                                className="mt-1 p-2 border rounded-md w-full h-48"
                                name="staffMembersIds"
                                id="staffMembersIds"
                                multiple
                                required
                            >
                                {technicalStaffsData.length > 0 ? (
                                    technicalStaffsData.map((technicalStaff) => (
                                        <option key={technicalStaff.id} value={technicalStaff.id}>
                                            {technicalStaff.firstName} {technicalStaff.lastName}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No Staff Available</option>
                                )}
                            </select>
                            <small className="text-gray-500">Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.</small>
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
