import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import apiUrl from '../../apiConfig';
import { useNavigate,useParams, useLocation, } from 'react-router-dom';
import PreferenceModal from '../../helpers/PreferenceModal';
import { MdOutlineSettingsSuggest } from "react-icons/md";

import { hubStatHeader, hubStat } from '../../helpers/BillData';

import Table from '../../helpers/Table';
import { UtilityContext } from '../context/UtilityContext';
import { HeaderContext } from '../context/HeaderContext';
import  ApiClient  from '../../helpers/ApiClient';



const ViewCustomer = () => {
  axios.defaults.baseURL = apiUrl;

  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [customer, setcustomer] = useState([]);
  
  const { headers } = useContext(HeaderContext);
  const { formatHeader } = useContext(UtilityContext);
  const id = parameters;
  const parameters = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [meterReadingPageDetails, setMeterReadingPageDetails] = useState('');

  // Number of items to display per page

  const [isLoading, setIsLoading] = useState(true);
  const preferenceTableName = 'meterReadingTablePreferences';

 


  useEffect(() => {
    fetchCustomer()
  }, [id]);

  const fetchCustomer = () => {
    setIsLoading(true);
    
    const apiClient = new ApiClient({
      url: `/api/customers/`,
      headers: {
        'disco' : 'root',},
      params: {
        'id':id,
      },
      onSuccess: (data) => {
        setcustomer(data.data.data);
        setMeterReadingPageDetails(data.data);
        
        setIsLoading(false);
        
      },
      onError: (error) => {
        console.error('Error fetching meter readings', error);
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
    
    localStorage.setItem(preferenceTableName, JSON.stringify(preferences));
    fetchCustomer(); // Re-fetch customer to refresh data
  };

 

  return (
    <div className="flex m-6 bg-white flex-col">


      <div className="px-3 border mb-12">
        <table className="w-full">
          <thead>
            <tr className="h-16">
              {hubStatHeader.map(statHeader => (
                <th key={statHeader} className="font-semibold text-sm px-4  py-2 text-left text-login-text-color">
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
        <Table
          data={customer}
          pageDetails={meterReadingPageDetails}
          preference={preferenceTableName}
          updateData={fetchCustomer}/>
      </div>
  
    </div>
  );

};

export default ViewCustomer;
