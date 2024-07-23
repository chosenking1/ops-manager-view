import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import apiUrl from '../../apiConfig';
import { useNavigate, useLocation, } from 'react-router-dom';
import PreferenceModal from '../../helpers/PreferenceModal';
import { MdOutlineSettingsSuggest } from "react-icons/md";

import Table from '../../helpers/Table';
import { UtilityContext } from '../context/UtilityContext';
import { HeaderContext } from '../context/HeaderContext';

import ApiClient from '../../helpers/ApiClient';


const Enumeration = () => {
  axios.defaults.baseURL = apiUrl;

  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [enumerations, setEnumerations] = useState([]);
  const [totalEnumerations, setTotalEnumerations] = useState('');
  const { headers } = useContext(HeaderContext);
  const { formatHeader } = useContext(UtilityContext);
  const [visibleHeaders, setVisibleHeaders] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const [enumerationPageDetails, setEnumerationPageDetails] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Number of items to display per page
  const [isLoading, setIsLoading] = useState(true);

  const preferenceTableName = 'enumerationTablePreferences';
  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = enumerations.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination change
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchEnumerations();

    // Load saved preferences from local storage
    const savedPreferences = JSON.parse(localStorage.getItem(preferenceTableName));
    if (savedPreferences) {
      setVisibleHeaders(savedPreferences);
    }
  }, []);

  const fetchEnumerations = (page = currentPage, pageSize = itemsPerPage) => {
    setItemsPerPage(pageSize);
    setIsLoading(true);
    const apiClient = new ApiClient({
      url: '/api/enumerations/search',
      headers: {
        'disco' : 'root',},
      params: {
        'pageNumber': page,
        'pageSize': pageSize,
      },
      onSuccess: (data) => {
        setEnumerationPageDetails(data.data);
        setEnumerations(data.data.data);
        setTotalEnumerations(data.data.totalCount);
        setIsLoading(false);
        setCurrentPage(page);
      },
      onError: (error) => {
        console.error(error);
        setIsLoading(false);
      },
    });
    apiClient.fetchData();
  };

 

  const openPreferencesModal = () => {
    setIsPreferencesModalOpen(true);
  };

  const closePreferencesModal = () => {
    setIsPreferencesModalOpen(false);
  };

  const savePreferences = (preferences) => {
    setVisibleHeaders(preferences);
    localStorage.setItem(preferenceTableName, JSON.stringify(preferences));
    fetchEnumerations(); // Re-fetch enumerations to refresh data
  };

 


  return (
    <div className="flex bg-white flex-col ">
      <div>

      </div>

      <div className="p-4 flex h-20 ">
      
        <p className='w-full max-w-[177px] pl-3 text-xl font-semibold text-mygard-1'>
          Enumeration List</p>
        
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
      <div className='flex mb-6 justify-between w-full' >

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
      <PreferenceModal isOpen={isPreferencesModalOpen} onClose={closePreferencesModal} headers={headers.map(formatHeader)} onSave={savePreferences} />

      <div className="px-3 overflow-x-auto">
      <Table data={enumerations} pageDetails={enumerationPageDetails} preference={preferenceTableName} updateData={fetchEnumerations}/>
      </div>
    </div>
  );
};

export default Enumeration;
