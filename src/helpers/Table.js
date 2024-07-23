import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeaderContext } from '../components/context/HeaderContext';
import { UtilityContext } from '../components/context/UtilityContext';

const Table = ({ data, pageDetails, preference, updateData }) => {
  const [pageData, setPageData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  // const [headers, setHeaders] = useState([]);
  // const {gettool} = useContext(HeaderContext)
  // const [headers, setHeaders] = useState(gettool(data));
  const { formatHeader } = useContext(UtilityContext);
  const { headers, populateHeader } = useContext(HeaderContext);

  const [visibleHeaders, setVisibleHeaders] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const savedPreferences = JSON.parse(localStorage.getItem(preference));
    if (savedPreferences) {
      setVisibleHeaders(savedPreferences);
    }
  }, []);


  useEffect(() => {
    // Fetch customers when customers or pageDetails change
    if (data && pageDetails) {
      setPageData(data);
      setTotalData(pageDetails.totalCount);
      setItemsPerPage(pageDetails.pageSize);
      setCurrentPage(pageDetails.currentPage);

      if (data.length > 0) {
        const extractedHeaders = Object.keys(data[0]).filter(
          header => header !== 'id' && header !== 'emailConfirmed'
        );
        const formattedHeaders = extractedHeaders.map(header => formatHeader(header));
        // setHeaders(extractedHeaders);
        populateHeader(data);
        const savedPreferences = JSON.parse(localStorage.getItem(preference));
        setVisibleHeaders(savedPreferences || formattedHeaders.slice(0, 5));
        if (!savedPreferences) {
          localStorage.setItem(preference, JSON.stringify(formattedHeaders.slice(0, 5)));
        }
      }
    }
  }, [data, pageDetails,]);


  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalData / itemsPerPage)) {
      setCurrentPage(newPage);
      updateData(newPage, itemsPerPage);
    }
  };

  const handleItemsPerPageChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setItemsPerPage(newSize);
    setCurrentPage(1);
    updateData(1, newSize);
  };

  const handlePageInputChange = (event) => {
    const value = event.target.value;
    if (value === '' || (Number(value) >= 1 && Number(value) <= Math.ceil(totalData / itemsPerPage))) {
      setCurrentPage(Number(value));
      updateData(Number(value), itemsPerPage);
    }
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

    <div className='overflow-x-auto'>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-login-text-color ">
          <thead className="text-xs text-white uppercase bg-cutomer-table-header dark:text-white">
            <tr>
              {visibleHeaders.map(header => (
                <th key={header} scope="col" className="px-6 py-4">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, index) => (
              <tr key={index} className=" border-b border-[#E8EBEE]">
                {visibleHeaders.map(header => {
                  const originalKey = headerMapping[header];
                  

                  if (row[originalKey] === true || row[originalKey] === false) {
                    return (
                      <th 
                        key={header} 
                        scope="row" 
                        className={`px-6 py-4 font-medium ${row[originalKey] ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                      >
                        {row[originalKey] ? 'Yes' : 'No'}
                      </th>
                    );
                  }

                  return <td key={header} className="px-6 py-4">{row[originalKey]}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <div className="flex justify-center">
          <label>
            Show:
            <select className='border rounded' value={itemsPerPage} onChange={handleItemsPerPageChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </label>
        </div>

        <div className="flex justify-center">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
        </div>

        <div className="flex justify-center">
          {Array.from({ length: Math.ceil(totalData / itemsPerPage) }).map(
            (item, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-4 py-2 text-sm rounded-full ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'text-blue-500 border border-blue-500'}`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>

        <div className="flex justify-center">
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(totalData / itemsPerPage)}>
            Next
          </button>
        </div>

        <div className="flex justify-center">
          <label>Go to:</label> &nbsp;
          <input
            type="number"
            value={currentPage}
            onChange={handlePageInputChange}
            className="mx-2 px-2 py-1 border rounded"
            min="1"
            max={Math.ceil(totalData / itemsPerPage)}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;