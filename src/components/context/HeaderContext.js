// HeaderContext.js
import React, { createContext, useState, useEffect } from 'react';

const HeaderContext = createContext();

const HeaderProvider = ({ children }) => {
  const [headers, setHeaders] = useState([]);

  const populateHeader = (data) => {
    if (data && data.length > 0) {
      const extractedHeaders = Object.keys(data[0]).filter(
        header => header !== 'id' && header !== 'emailConfirmed'
      );
      setHeaders(extractedHeaders);
    }
  };

  return (
    <HeaderContext.Provider value={{ headers, populateHeader }}>
      {children}
    </HeaderContext.Provider>
  );
};

export { HeaderProvider, HeaderContext };
