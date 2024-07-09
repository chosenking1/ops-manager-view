import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { RiSearch2Line } from "react-icons/ri";
import { GrDocumentUpload } from "react-icons/gr";
import { IoMdAddCircle } from "react-icons/io";
import PreferenceModal from '../../../helpers/PreferenceModal';

import axios from 'axios';
import apiUrl from '../../../apiConfig';

import { allLinks } from '../../../helpers/LinkDetails';


const UserManagement = () => {

  axios.defaults.baseURL = apiUrl;

  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [visibleHeaders, setVisibleHeaders] = useState([]);
  const [pageName, setPageName] = useState('');
  const [currentPage, setCurrentPage] = useState('1');
  const location = useLocation();
  const navigate = useNavigate();
  

  const [itemsPerPage] = useState(10); // Number of items to display per page

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination change
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchUsers();
    // Find the current page name based on the current location pathname
    const currentPageObj = allLinks.find(link => link.link === location.pathname);
    setPageName(currentPageObj ? currentPageObj.name : 'Unknown');

    // Load saved preferences from local storage
    const savedPreferences = JSON.parse(localStorage.getItem('tablePreferences'));
    if (savedPreferences) {
      setVisibleHeaders(savedPreferences);
    }
  }, [location.pathname]);

  const fetchUsers = () => {
    const token = sessionStorage.getItem('token');

    axios
      .get('/api/users', {
        headers: {
          'Accept': 'application/vnd.api+json',
          'disco': 'root',
          'Content-Type': 'application/vnd.api+json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then(response => {
        const userData = response.data.data
        setUsers(userData);

        // Extract headers
        if (userData.length > 0) {
          const headers = Object.keys(userData[0]).filter(header => header !== 'id' && header !== 'emailConfirmed');
          const formattedHeaders = headers.map(header => formatHeader(header));
          setHeaders(headers);
          console.log('Real headers', headers);
          if (!visibleHeaders.length) {
            setVisibleHeaders(formattedHeaders.slice(0, 5));
            console.log('Visible headers', visibleHeaders); // Set initial visible headers
          }

        }
      })
      .catch(error => {
        console.error('Error fetching Users:', error);
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
    localStorage.setItem('userTablePreferences', JSON.stringify(preferences));
    fetchUsers(); // Re-fetch users to refresh data
  };

  const mapVisibleHeadersToOriginal = () => {
    const headerMapping = {};
    headers.forEach(header => {
      headerMapping[formatHeader(header)] = header;
    });
    console.log('herder mapping headers', headerMapping);
    return headerMapping;
  };

  const headerMapping = mapVisibleHeadersToOriginal();

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
      <PreferenceModal isOpen={isPreferencesModalOpen} onClose={closePreferencesModal} headers={headers.map(formatHeader)} onSave={savePreferences} />
      <div className="px-3  overflow-x-auto">
        <table className="w-full ">
          <thead className=''>
            <tr className="bg-cutomer-table-header border h-16 rounded-t-2xl ">
              {visibleHeaders.map(header => (
                <th key={header} className=" font-medium text-base px-1 py-2">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="border divide-y">
            {currentItems.map((row, index) => (
              <tr key={index} className="">
                {visibleHeaders.map(header => {
                  const originalKey = headerMapping[header];
                  if (originalKey === 'isActive') {
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
        {Array.from({ length: Math.ceil(users.length / itemsPerPage) }).map(
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

export default UserManagement;
