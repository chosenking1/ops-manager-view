// Layout.js
import React from 'react';
import Navbar from './layouts/Navbar';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routes
import Sidebar from './layouts/Sidebar';

function Layout({ children }) {
  // const shouldShowNavbar = !window.location.pathname.includes('/login'); // Check for login path

  return (
    <div className="app-container flex ">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full">
        <div className="">
          <Navbar />
        </div>
        <div className="">
          <Outlet /> {/* Render nested routes */}

        </div>
      </div>
    </div>
  );
}

export default Layout;
