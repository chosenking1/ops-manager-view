import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create a custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle logout
  const logout = () => {
    // Perform logout logic, such as deleting token from local storage
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  // Function to handle login (if needed)
  // ...

  const authContextValue = {
    isLoggedIn,
    logout,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
