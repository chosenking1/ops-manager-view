import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../apiConfig';
import { useNavigate, useLocation, } from 'react-router-dom';
import PreferenceModal from '../../helpers/PreferenceModal';
import { MdOutlineSettingsSuggest } from "react-icons/md";

import { tableHeader, tableRows, hubStatHeader, hubStat } from '../../helpers/BillData';



const MeterReading = () => {
  axios.defaults.baseURL = apiUrl;

  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [meterReadings, setMeterReadings] = useState([]);
  const [totalMeterReadings, setTotalMeterReadings] = useState('');
  const [headers, setHeaders] = useState([]);
  const [visibleHeaders, setVisibleHeaders] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = meterReadings.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination change
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchMeterReadings();

    // Load saved preferences from local storage
    const savedPreferences = JSON.parse(localStorage.getItem('meterReadingTablePreferences'));
    if (savedPreferences) {
      setVisibleHeaders(savedPreferences);
    }
  }, []);

  const fetchMeterReadings = () => {
    const token = localStorage.getItem('token');

    axios
      .get('/api/meterReadings/search', {
        headers: {
          'Accept': 'application/vnd.api+json',
          'disco': 'root',
          'Content-Type': 'application/vnd.api+json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then(response => {
        const meterReadingData = response.data.data.data
        const pageDetails = response.data.data
        setMeterReadings(meterReadingData);
        setTotalMeterReadings(pageDetails.totalCount);

        // Extract headers
        if (meterReadingData.length > 0) {
          const headers = Object.keys(meterReadingData[0]).filter(header => header !== 'id' && header !== 'emailConfirmed');
          const formattedHeaders = headers.map(header => formatHeader(header));
          setHeaders(headers);

          if (!visibleHeaders.length) {
            setVisibleHeaders(formattedHeaders.slice(0, 5));
            // Set initial visible headers
          }

        }
      })
      .catch(error => {
        console.error('Error fetching Meter Readings:', error);
      });
  };

  const formatHeader = (header) => {
    return header
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  const openPreferencesModal = () => {
    setIsPreferencesModalOpen(true);
  };

  const closePreferencesModal = () => {
    setIsPreferencesModalOpen(false);
  };

  const savePreferences = (preferences) => {
    setVisibleHeaders(preferences);
    localStorage.setItem('meterReadingTablePreferences', JSON.stringify(preferences));
    fetchMeterReadings(); // Re-fetch meterReadings to refresh data
  };

  const mapVisibleHeadersToOriginal = () => {
    const headerMapping = {};
    headers.forEach(header => {
      headerMapping[formatHeader(header)] = header;
    });

    return headerMapping;
  };

  const headerMapping = mapVisibleHeadersToOriginal();

  return (
    <div className="flex m-6 bg-white flex-col">


      <div className="px-3 border mb-12">
        <table className="w-full">
          <thead>
            <tr className="h-16">
              {hubStatHeader.map(statHeader => (
                <th key={statHeader} className="font-semibold text-sm px-4 text-base py-2 text-left text-login-text-color">
                  {statHeader}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {hubStat.map((row, index) => (
              <tr key={index} className="">
                {Object.values(row).map((value, index) => (
                  <td key={index} className="mx-20 px-4 py-2 text-left text-light-gery">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 flex w-full h-20 justify-content justify-between">
        <p className='w-full text-xl font-semibold text-mygard-1'>Meter Reading</p>
        <div className='flex w-full place-content-end'>
          <button
            className=" place-content-center place-items-center h-full w-full max-w-[128px] max-h-12 text-[#003057] border border-[#003057] rounded-lg text-sm font-semibold hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
            Download CSV
          </button>

          <button onClick={openPreferencesModal}
            className="w-full h-full flex place-content-center place-items-center ml-2 max-h-12, max-w-[150px] bg-custom-blue text-white rounded-lg text-sm font-semibold">
            <div
              className=""><MdOutlineSettingsSuggest /></div>
            <div>Set Preference</div>
          </button>
        </div>
      </div>



      <div className='flex mb-6' >

        <div className="relative">
          <input className='m-2 p-4 pl-12 pr-4 text-sm text-gray-900 border border-light-gray rounded-lg dark:placeholder-light-gray dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Search' />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.81-4.81" />
              <circle cx="10.5" cy="10.5" r="7.5" />
            </svg>
          </div>
        </div>

        <input className='m-2 p-4 ps-10 text-sm text-gray-900 border border-light-gery rounded-lg dark:placeholder-light-gery dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Filter by CRO' />
        <input className='m-2 p-4 ps-10 text-sm text-gray-900 border border-light-gery rounded-lg dark:placeholder-light-gery dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Filter by Approval Status' />
        <input className='m-2 p-4 ps-10 text-sm text-gray-900 border border-light-gery rounded-lg dark:placeholder-light-gery dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='From ' />
        <input className='m-2 p-4 ps-10 text-sm text-gray-900 border border-light-gery rounded-lg dark:placeholder-light-gery dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='To' />
      </div>

      <PreferenceModal isOpen={isPreferencesModalOpen} onClose={closePreferencesModal} headers={headers.map(formatHeader)} onSave={savePreferences} />

      <div className="px-3 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-cutomer-table-header h-16">
              {visibleHeaders.map(header => (
                <th key={header} className="font-medium text-base px-1 py-2">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="border divide-y">
            {currentItems.map((row, index) => (
              <tr key={index} className="">
                {visibleHeaders.map(header => {
                  const originalKey = headerMapping[header];
                  if (originalKey === 'Status') {
                    return (
                      <td key={header} className={`px-4 py-2 ${row[originalKey] ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {row[originalKey] ? 'Yes' : 'No'}
                      </td>
                    );
                  }

                  return <td key={header} className="px-4 py-2">{row[originalKey]}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(meterReadings.length / itemsPerPage) }).map(
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

export default MeterReading;
