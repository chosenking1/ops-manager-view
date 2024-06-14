import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; 

const ProtectedRoute = () => {
  const { isLoggedIn, isLoading  } = useAuth();

 
    if (isLoading) {
      return; // Do nothing if still loading
    }

 
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    } 
        return <Outlet />;
    
  }; 


  

export default ProtectedRoute;
