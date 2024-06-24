import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../apiConfig';
import { tableHeader, tableRows } from '../../helpers/EnumerationData';

const Enumeration = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableRows.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination change
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="flex bg-white flex-col">
      <div>

      </div>

      <div className="p-4 flex w-full h-20 justify-content justify-between">
        <p className='text-xl font-semibold text-mygard-1'>Enumeration List</p>
        <button className="mx-12 w-[128px] item-center text-center text-white text-sm font-semibold  rounded-lg bg-custom-blue hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
          Download CSV
        </button>

      </div>
      <div className='flex mb-6 justify-between mr-16' >

        <div className="relative">
          <input className='m-2 p-4 pl-12 pr-4 text-sm text-gray-900 border border-light-gray rounded-lg dark:placeholder-light-gray dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Search' />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.81-4.81" />
              <circle cx="10.5" cy="10.5" r="7.5" />
            </svg>
          </div>
        </div>
        <div>
          <input className='m-2 p-4 ps-10 text-sm text-gray-900 border border-light-gery rounded-lg dark:placeholder-light-gery dark:focus:ring-blue-500 w-50 h-12 dark:focus:border-blue-500' placeholder='Filter by CRO' />

          <input className='m-2 p-4 ps-10 text-sm text-gray-900 border border-light-gery rounded-lg dark:placeholder-light-gery dark:focus:ring-blue-500 dark:focus:border-blue-500 h-12 w-40' placeholder='From ' />
          <input className='m-2 p-4 ps-10 text-sm text-gray-900 border border-light-gery rounded-lg dark:placeholder-light-gery dark:focus:ring-blue-500 dark:focus:border-blue-500 h-12 w-40' placeholder='To' />
        </div>
      </div>

      <div className="px-3 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-cutomer-table-header h-16">
              {tableHeader.map(header => (
                <th key={header} className="font-medium text-base px-1 py-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="border divide-y">
            {currentItems.map((row, index) => (
              <tr key={index} className="">
                {Object.values(row).map((value, index) => (
                  <td key={index} className="px-4 py-2">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(tableRows.length / itemsPerPage) }).map(
          (item, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-4 py-2 text-sm rounded-full ${currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'text-blue-500 border border-blue-500'
                }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Enumeration;
