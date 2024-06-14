import React, { useState } from 'react';
import axios from 'axios';
import apiUrl from '../../../apiConfig';
import { tableHeader, tableRows } from '../../../helpers/CustomerData';
import SearchModal from '../../customer/SearchModal';


const UserManagement = () => {

  axios.defaults.baseURL = apiUrl;

 
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  
    const openSearchModal = () => {
      setIsSearchModalOpen(true);
    };
  
    const closeSearchModal = () => {
      setIsSearchModalOpen(false);
    };

  return (
    <div className="flex bg-white flex-col">
  <div className="p-4 flex w-full h-20 justify-content justify-end">
    <button className="mx-2 px-6 py-2 min-w-[120px] text-center text-violet-600 border border-violet-600 rounded-lg hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
      Download
    </button>
    <button onClick={openSearchModal} className="ml-2 h-12, w-32 bg-custom-blue text-white rounded-lg text-sm font-semibold">
      Search
    </button>
  </div>
  <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
  <div className="px-3 overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-cutomer-table-header h-16">
          {tableHeader.map(header => (
            <th key={header} className="font-medium text-base px-1 py-2">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="border divide-y">
        {tableRows.map((row, index) => (
          <tr key={index} className="">
            {Object.values(row).map((value, index) => (
              <td key={index} className="px-4 py-2">{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default UserManagement;
