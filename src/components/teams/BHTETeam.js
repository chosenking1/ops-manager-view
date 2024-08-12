import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import apiUrl from '../../apiConfig';
import { useNavigate, useParams, useLocation, } from 'react-router-dom';
import PreferenceModal from '../../helpers/PreferenceModal';
import { TiDocumentAdd } from "react-icons/ti";
import { BiErrorAlt } from "react-icons/bi";
import { BiCopy } from "react-icons/bi";
import { IoAddCircle } from "react-icons/io5";
import { AiOutlinePrinter } from "react-icons/ai";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import Table from '../../helpers/Table';
import { UtilityContext } from '../context/UtilityContext';
import { HeaderContext } from '../context/HeaderContext';
import ApiClient from '../../helpers/ApiClient';



const BHTETeam = () => {
    axios.defaults.baseURL = apiUrl;

    const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
    const [BHTETeam, setBHTETeam] = useState('');
    const [BHTETeamPageDetails, setBHTETeamPageDetails] = useState(true);

    const { headers } = useContext(HeaderContext);
    const { formatHeader } = useContext(UtilityContext);
    const parameters = useParams();
    // const { id } = parameters;
    const location = useLocation();
    const navigate = useNavigate();



    const [isLoading, setIsLoading] = useState(true);
    const preferenceTableName = 'BhteTeamTablePreferences';

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);



    useEffect(() => {

        fetchTeam(currentPage, itemsPerPage);

    }, [currentPage, itemsPerPage]);



    const fetchTeam = (page = currentPage, pageSize = itemsPerPage) => {
        setIsLoading(true);

        const apiClient = new ApiClient({
            url: `/api/teams/`,
            headers: {
                'disco': 'root',
            },
            params: {
                'pageNumber': page,
                'pageSize': pageSize,
                // 'name': teamName,
            },
            onSuccess: (data) => {
                setBHTETeam(data.data.data);
                setBHTETeamPageDetails(data.data);
                setIsLoading(false);
                setCurrentPage(page);
                setItemsPerPage(pageSize);
                console.log('id', BHTETeam)

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
        fetchTeam(); // Re-fetch bill history to refresh data
    };

    

    return (
        <div className="flex m-6 bg-white flex-col">
            <h3 className=' mb-2 w-full text-xl font-semibold text-mygard-1'>BHTE Team</h3>
            <div className="p-4 flex  h-20 justify-between">
                <p className=' w-full text-xl font-semibold text-mygard-1'>Team List</p>
                <div className='flex w-full place-content-end place'>
                    <button
                        className="flex place-content-center place-items-center h-full w-full max-w-[139px] max-h-12 text-[#003057] border border-[#003057] rounded-lg text-sm font-semibold hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
                        <div className='mr-1 text-lg'><IoAddCircle /></div>
                        Create Team
                    </button>

                    <div className='flex  '>
                        <button onClick={openPreferencesModal}
                            className="w-full h-full flex px-2 place-items-center ml-2 max-h-12, max-w-[150px] bg-custom-blue text-white rounded-lg text-sm font-semibold">
                            <div className=" mr-1 text-lg"><MdOutlineSettingsSuggest /></div>
                            <div>Set Preference</div>
                        </button>
                    </div>
                </div>
            </div>


            <div className='flex w-full mb-6  justify-content justify-between' >

                <div className="relative">
                    <input className=' p-4 pl-12 pr-4 text-sm text-gray-900 border border-light-gray rounded-lg dark:placeholder-light-gray dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Search by Team Name' />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.81-4.81" />
                            <circle cx="10.5" cy="10.5" r="7.5" />
                        </svg>
                    </div>
                </div>
                <div className='flex w-full place-content-end'>


                    {/* <button
                        className="flex place-content-center place-items-center h-full w-full max-w-[82px] max-h-12 text-[#003057] border border-[#003057] rounded-lg text-sm font-semibold hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
                        <div className='mr-1 text-lg'><AiOutlinePrinter /></div>
                        Print
                    </button> */}
                </div>
            </div>

            <PreferenceModal isOpen={isPreferencesModalOpen} onClose={closePreferencesModal} headers={headers.map(formatHeader)} onSave={savePreferences} />

            <div className="px-3 overflow-x-auto">
                <Table
                    data={BHTETeam}
                    pageDetails={BHTETeamPageDetails}
                    preference={preferenceTableName}
                    updateData={fetchTeam} />
            </div>

        </div>
    );

};

export default BHTETeam;
