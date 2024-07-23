import React, { createContext } from 'react';

const UtilityContext = createContext();

const UtilityProvider = ({ children }) => {
  const formatHeader = (header) => {
    return header
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  return (
    <UtilityContext.Provider value={{ formatHeader }}>
      {children}
    </UtilityContext.Provider>
  );
};

export { UtilityProvider, UtilityContext };
