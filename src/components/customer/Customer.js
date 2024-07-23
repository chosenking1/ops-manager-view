import React, { useState, useEffect,useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import SearchModal from './SearchModal';
import { MdOutlineSettingsSuggest, MdKeyboardArrowDown } from "react-icons/md";
import PreferenceModal from '../../helpers/PreferenceModal';
import Table from '../../helpers/Table';
import { UtilityContext } from '../context/UtilityContext';
import { HeaderContext } from '../context/HeaderContext';
import  ApiClient  from '../../helpers/ApiClient';

const Customer = () => {
  

  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const { headers } = useContext(HeaderContext);
  const { formatHeader } = useContext(UtilityContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [customersPageDetails, setCustomersPageDetails] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const preferenceTableName = 'customerTablePreferences';
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  useEffect(() => {
    fetchCustomers(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

 

  const fetchCustomers = async (page = currentPage, pageSize = itemsPerPage) => {
    // const token = sessionStorage.getItem('token');
    setItemsPerPage(pageSize);
    setIsLoading(true);
    const apiClient = new ApiClient({
      url: '/api/customers',
      headers: {
        'disco' : 'root',},
      params: {
        'pageNumber': page,
        'pageSize': pageSize,
      },
      onSuccess: (data) => {
        
        setCustomersPageDetails(data.data);
        setCustomers(data.data.data);
        setTotalCustomers(data.data.totalCount);
        setIsLoading(false);
        setCurrentPage(page);
      },onError:(error) => {
        console.error('Error fetching Customers:', error)
        setIsLoading(false)
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
    
    localStorage.setItem(preferenceTableName, JSON.stringify(preferences));
    fetchCustomers();
  };

  

  return (
    <div className="flex bg-white flex-col">
      <div className="flex max-w-[865px] w-full h-full bg-totalBg bg-no-repeat place-content-center place-items-center">
        <p className='pr-1 font-medium text-lg'>Total Customer:</p>
        <p className='pr-1 font-semibold text-xl'>{totalCustomers}</p>
      </div>
      <div className="p-4 flex w-full min-h-20 justify-between">
        <div className="relative w-full flex max-w-[488px] items-center">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.81-4.81" />
              <circle cx="10.5" cy="10.5" r="7.5" />
            </svg>
          </div>
          <input
            className="w-full p-4 pl-12 pr-4 text-sm text-gray-900 border border-light-gray rounded-lg dark:placeholder-light-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
          />
        </div>
        <div className='flex place-content-end place-items-center w-full'>
          <button
            onClick={openSearchModal}
            className="flex place-content-center place-items-center h-full w-full max-w-[85px] max-h-12 text-[#003057] border border-[#003057] rounded-lg text-sm font-semibold hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
          >
            <div>Filter</div>
            <div><MdKeyboardArrowDown /></div>
          </button>
          <button 
            onClick={openPreferencesModal}
            className="w-full h-full flex place-content-center place-items-center ml-2 max-h-12 max-w-[150px] bg-custom-blue text-white rounded-lg text-sm font-semibold"
          >
            <div className=""><MdOutlineSettingsSuggest /></div>
            <div>Set Preference</div>
          </button>
        </div>
      </div>
      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
      <PreferenceModal isOpen={isPreferencesModalOpen} onClose={closePreferencesModal} headers={headers.map(formatHeader)} onSave={savePreferences} preference={preferenceTableName}/>
      <div className="px-3 overflow-x-auto">
        <Table data={customers} pageDetails={customersPageDetails} preference={preferenceTableName} updateData={fetchCustomers}/>
      </div>
    </div>
  );
};

export default Customer;