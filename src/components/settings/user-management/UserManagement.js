import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { RiSearch2Line } from "react-icons/ri";
import { GrDocumentUpload } from "react-icons/gr";
import { IoMdAddCircle } from "react-icons/io";
import PreferenceModal from '../../../helpers/PreferenceModal';

import axios from 'axios';
import apiUrl from '../../../apiConfig';

import { UtilityContext } from '../../context/UtilityContext';
import { allLinks } from '../../../helpers/LinkDetails';
import ApiClient from '../../../helpers/ApiClient';
import Table from '../../../helpers/Table';
import { HeaderContext } from '../../context/HeaderContext';


const UserManagement = () => {

  axios.defaults.baseURL = apiUrl;

  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  // const [headers, setHeaders] = useState([]);
  const [visibleHeaders, setVisibleHeaders] = useState([]);
  const [pageName, setPageName] = useState('');
  const [currentPage, setCurrentPage] = useState('1');
  const location = useLocation();
  const navigate = useNavigate();
  const preferenceTableName = 'userTablePreferences';

  const { formatHeader } = useContext(UtilityContext)

  const [isLoading, setLoading] = useState(true);
  const [usersPageDetails, setUsersPageDetails] = useState('');

  const [totaUsers, setTotalUsers] = useState('');

  const { headers } = useContext(HeaderContext);
  const [itemsPerPage] = useState(10); // Number of items to display per page

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 

  // Pagination change
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchUsers();
    // Find the current page name based on the current location pathname
    const currentPageObj = allLinks.find(link => link.link === location.pathname);
    setPageName(currentPageObj ? currentPageObj.name : 'Unknown');

   
  }, [location.pathname,currentPage, itemsPerPage ]);

  const fetchUsers = async(page = currentPage, pageSize = itemsPerPage) => {
    setLoading(true);
    const apiClient = new ApiClient({
      url: '/api/users',
      headers: {
        'disco': 'root',
      },
      params: {
        'pageNumber': page,
        'pageSize': pageSize,
      },
      onSuccess: (data) => {

        setUsersPageDetails(data.data);
        setUsers(data.data.data);
        setTotalUsers(data.dat.totalCount);
        setLoading(false);
        setCurrentPage(page);
      },
      onError: (error) => {
        console.error('Error fetching Users:', error);
        setLoading(false);
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
    fetchUsers(); // Re-fetch users to refresh data
  };

  // const mapVisibleHeadersToOriginal = () => {
  //   const headerMapping = {};
  //   headers.forEach(header => {
  //     headerMapping[formatHeader(header)] = header;
  //   });
  //   // console.log('herder mapping headers', headerMapping);
  //   return headerMapping;
  // };

  // const headerMapping = mapVisibleHeadersToOriginal();

  const addUser = () => {
    navigate(`/register`);
  };


  return (
    <div className="flex bg-white flex-col w-full">
      <div className="p-4 flex w-full h-20 justify-between ">

        <div className=" w-full text-2xl text-custom-blue font-bold font-montserrat">
          {pageName}
        </div>
        <div className='flex w-full place-content-end'>
          <button className="w-full flex place-content-center place-items-center mr-2 font-semibold text-sm max-w-[150px] text-[#003057] border border-[#003057] rounded-lg hover:bg-[#003057] hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
            <div className="py-1 pr-1 "><IoDocumentTextOutline /></div>
            <div>Export in CSV</div>
          </button>

          <button onClick={openPreferencesModal} className="w-full flex place-content-center place-items-center ml-2 h-12, max-w-[150px] bg-custom-blue text-white rounded-lg text-sm font-semibold">

            <div className=""><MdOutlineSettingsSuggest /></div>
            <div>Set Preference</div>
          </button>
        </div>
      </div>


      <div className="p-4 flex w-full min-h-20 justify-between  ">


        <div className="relative w-full  flex max-w-[488px] items-center">
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
          <button onClick={addUser} className=" flex place-content-center place-items-center h-full w-full max-w-[112px] max-h-12 text-[#003057] border border-[#003057] rounded-lg hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
            <div><IoMdAddCircle /></div>
            <div>Add User</div>
          </button>

          <button className=" h-full w-full flex mx-4 place-content-center place-items-center max-w-[197px] max-h-12 text-center text-[#003057] border border-[#003057] rounded-lg hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
            <div><GrDocumentUpload /></div>
            <div>Upload CRO Manifest</div>

          </button>

          <button className=" flex place-content-center place-items-center h-full w-full max-w-[197px] max-h-12 text-center text-[#003057] border border-[#003057] rounded-lg hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
            <div><GrDocumentUpload /></div>
            <div>Upload User Manifest</div>

          </button>

        </div>
      </div>
      <PreferenceModal isOpen={isPreferencesModalOpen} onClose={closePreferencesModal} headers={headers.map(formatHeader)} onSave={savePreferences} preference={preferenceTableName} />
      <div className="px-3 overflow-x-auto">
        <Table data={users} pageDetails={usersPageDetails} preference={preferenceTableName} updateData={fetchUsers}/>
      </div>
     

     
    </div>

  );
};

export default UserManagement;
