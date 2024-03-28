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
      <div className="p-4 flex w-full h-20 justify-content justify-end">
        <button className="mx-20 w-[128px] item-center text-center text-white text-sm font-semibold  rounded-lg bg-custom-blue hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
          Download CSV
        </button>
        
      </div>

      <div className="px-3">
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
              className={`mx-1 px-4 py-2 text-sm rounded-full ${
                currentPage === index + 1
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
