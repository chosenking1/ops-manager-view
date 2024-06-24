import React, { useState, useEffect } from 'react';
import { IoMdCloseCircle } from "react-icons/io";

const PreferenceModal = ({ isOpen, onClose, headers, onSave }) => {
  const [selectedHeaders, setSelectedHeaders] = useState(headers);

  useEffect(() => {
    // Load saved preferences from local storage or use default headers
    const savedPreferences = JSON.parse(localStorage.getItem('tablePreferences')) || headers;
    setSelectedHeaders(savedPreferences);
  }, [headers]);

  const handleHeaderChange = (header) => {
    setSelectedHeaders(prevState =>
      prevState.includes(header)
        ? prevState.filter(h => h !== header)
        : [...prevState, header]
    );
  };

  const handleSave = () => {
    localStorage.setItem('tablePreferences', JSON.stringify(selectedHeaders));
    onSave(selectedHeaders);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white px-6 mr-6 flex flex-col  max-h-[85%] h-full  rounded-lg ">
        <div className='flex justify-between pb-4 pt-4 text-[#003057]'>
        <h2 className='font-semibold text-2xl pr-12 '>Preference Settings</h2>
        <button onClick={onClose} className=' text-2xl'><IoMdCloseCircle /></button>
        </div>
        <form className=' mr-12 font-medium text-sm'>
          {headers.map(header => (
            <div key={header}>
              <input
                type="checkbox"
                id={header}
                checked={selectedHeaders.includes(header)}
                onChange={() => handleHeaderChange(header)}
                className='mr-4 mb-4'
              />
              <label htmlFor={header}>{header}</label>
            </div>
          ))}
        </form>
        <button onClick={handleSave} className='bg-[#003057] text-[#FFFFFF] rounded-lg mt-14'>Apply</button>
        
      </div>
    </div>
  );
};

export default PreferenceModal;
