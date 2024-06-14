import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create a custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

 

  // Function to handle logout
  const logout = () => {
    // Perform logout logic, such as deleting token from local storage
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  // Function to handle login (if needed)
  // ...
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      console.info(token);
      
    }
    setIsLoading(false); 
  }, []);
  // Return the AuthContext.Provider with the authContextValue as its value
  const authContextValue = {
    isLoggedIn,
    isLoading,
    setIsLoggedIn,
    logout,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
