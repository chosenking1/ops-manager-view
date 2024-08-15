import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import apiUrl from '../../apiConfig';
import { useNavigate, useParams, useLocation, } from 'react-router-dom';
import PreferenceModal from '../../helpers/PreferenceModal';
import { TiDocumentAdd } from "react-icons/ti";
import { BiErrorAlt } from "react-icons/bi";
import { BiCopy } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlinePrinter } from "react-icons/ai";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import Table from '../../helpers/Table';
import { UtilityContext } from '../context/UtilityContext';
import { HeaderContext } from '../context/HeaderContext';
import ApiClient from '../../helpers/ApiClient';



const ViewCustomer = () => {
  axios.defaults.baseURL = apiUrl;

  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [customer, setcustomer] = useState({});

  const { headers } = useContext(HeaderContext);
  const { formatHeader } = useContext(UtilityContext);
  const parameters = useParams();
  const { id } = parameters;
  const location = useLocation();
  const navigate = useNavigate();

  const [meterHistoryPageDetails, setMeterHistoryPageDetails] = useState('');
  const [meterHistory, setMeterHistory] = useState('');

  console.log(customer);
  const [isLoading, setIsLoading] = useState(true);
  const preferenceTableName = 'meterHistoryTablePreferences';

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchCustomer()
    fetchBillHistory(currentPage, itemsPerPage);
  }, [id]);

  useEffect(() => {
    // fetchCustomer()
    fetchBillHistory(currentPage, itemsPerPage);

  }, [currentPage, itemsPerPage]);

  const fetchCustomer = () => {
    setIsLoading(true);

    const apiClient = new ApiClient({
      url: `/api/customers/`,
      headers: {
        'disco': 'root',
      },
      params: {
        'id': id,
      
      },
      onSuccess: (data) => {
        setcustomer(data.data.data[0]);
        setIsLoading(false);

      },
      onError: (error) => {
        console.error('Error fetching Customer Data', error);
        setIsLoading(false);
      },
    });
    apiClient.fetchData();
  };

  const fetchBillHistory = (page = currentPage, pageSize = itemsPerPage) => {
    setIsLoading(true);

    const apiClient = new ApiClient({
      url: `/api/bills/`,
      headers: {
        'disco': 'root',
      },
      params: {
        'pageNumber': page,
        'pageSize': pageSize,
        'customerId': id,
      },
      onSuccess: (data) => {
        setMeterHistory(data.data.data);
        setMeterHistoryPageDetails(data.data);
        setIsLoading(false);
        setCurrentPage(page);
        setItemsPerPage(pageSize);
        console.log('id', id)

      },
      onError: (error) => {
        console.error('Error fetching Bills History', error);
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
    fetchBillHistory(); // Re-fetch bill history to refresh data
  };

  const CustomerDetailRow = ({ label1, value1, label2, value2, label3, value3, bgClass }) => (
    <div className={`flex w-full justify-between h-11 place-items-center ${bgClass}`}>
      <p className=''>{label1}: {value1}</p>
      <p>{label2}: {value2}</p>
      <p>{label3}: {value3}</p>
    </div>
  );

  return (
    <div className="flex m-6 bg-white flex-col">

      <div className="p-4 flex w-full h-20 justify-between">
        <p className='w-full text-xl font-semibold text-mygard-1'>Account Number: {customer.accountNumber}</p>

        <button
            className="flex place-content-center place-items-center h-full w-full max-w-[208px] max-h-12 text-[#003057] border border-[#003057] rounded-lg text-sm font-semibold hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
            <div className='mr-1 text-lg'><TiDocumentAdd /></div>
            Disconnection Request 
          </button>
          <button
            className="flex mx-4 place-content-center place-items-center h-full w-full max-w-[135px] max-h-12 text-[#003057] border border-[#003057] rounded-lg text-sm font-semibold hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
            <div className='mr-1 text-lg'><BiErrorAlt /></div>
            Fault Report 
          </button>
      </div>

      <div className="px-3 max-h-56 border mb-12 place-items-center">
        <div className='max-h-40 my-4 w-full flex flex-col justify-between'>
          <CustomerDetailRow
            label1="Surname" value1={customer.lastName}
            label2="Meter Number" value2={customer.meterNumber}
            label3="Outstanding Amount" value3={meterHistory.totalDue}
            bgClass="bg-[#0030570D]"
          />
          <CustomerDetailRow
            label1="First Name" value1={customer.firstName}
            label2="DSS Name" value2={customer.dtAssetId}
            label3="Last Payment" value3={customer.lastPayment}
          />
          <CustomerDetailRow
            label1="HUB" value1={customer.state}
            label2="Service Band" value2={customer.serviceBand}
            label3="Last Payment Date" value3={meterHistory.totalDue}
            bgClass="bg-[#0030570D]"
          />
          <CustomerDetailRow
            label1="Service Center" value1={customer.city}
            label2="Status" value2={customer.status}
            label3="" value3=""
          />
        </div>
      </div>


      <div className="p-4 flex w-full h-20 justify-content justify-between">
        <p className='w-full text-xl font-semibold text-mygard-1'>Bill History</p>
        <div className='flex w-full place-content-end'>

          <button onClick={openPreferencesModal}
            className="w-full h-full flex place-content-center place-items-center ml-2 max-h-12, max-w-[150px] bg-custom-blue text-white rounded-lg text-sm font-semibold">
            <div
              className=""><MdOutlineSettingsSuggest /></div>
            <div>Set Preference</div>
          </button>
        </div>
      </div>

      <div className='flex w-full mb-6  justify-content justify-between' >

        <div className="relative">
          <input className=' p-4 pl-12 pr-4 text-sm text-gray-900 border border-light-gray rounded-lg dark:placeholder-light-gray dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Search' />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.81-4.81" />
              <circle cx="10.5" cy="10.5" r="7.5" />
            </svg>
          </div>
        </div>
        <div className='flex w-full place-content-end'>

          <button
            className="flex place-content-center place-items-center h-full w-full max-w-[86px] max-h-12 text-[#003057] border border-[#003057] rounded-lg text-sm font-semibold hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
            <div className='mr-1 text-lg'><BiCopy /></div>
            Copy
          </button>
          <button
            className="flex mx-4 place-content-center place-items-center h-full w-full max-w-[80px] max-h-12 text-[#003057] border border-[#003057] rounded-lg text-sm font-semibold hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
            <div className='mr-1 text-lg'><IoDocumentTextOutline /></div>
            CSV
          </button>
          <button
            className="flex place-content-center place-items-center h-full w-full max-w-[82px] max-h-12 text-[#003057] border border-[#003057] rounded-lg text-sm font-semibold hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
            <div className='mr-1 text-lg'><AiOutlinePrinter /></div>
            Print
          </button>
        </div>
      </div>

      <PreferenceModal isOpen={isPreferencesModalOpen} onClose={closePreferencesModal} headers={headers.map(formatHeader)} onSave={savePreferences} />

      <div className="px-3 overflow-x-auto">
        <Table
          data={meterHistory}
          pageDetails={meterHistoryPageDetails}
          preference={preferenceTableName}
          updateData={fetchBillHistory} />
      </div>

    </div>
  );

};

export default ViewCustomer;
