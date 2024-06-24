import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../apiConfig';

import { FiMenu } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { IoNotificationsOutline } from "react-icons/io5";
import { useAuth } from '../components/userauth/AuthContext';
import Image from "../img/user.jpg";
import { allLinks } from '../helpers/LinkDetails';




const Navbar = () => {

  const [isSideMenuOpen, setMenu] = useState(false);



  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth(); 
  const location = useLocation();
  axios.defaults.baseURL = apiUrl;
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    // Find the current page name based on the current location pathname
    const currentPageObj = allLinks.find(link => link.link === location.pathname);
    
    if (currentPageObj && currentPageObj.belongsTo) {
      // If the current page is a sublink, find its parent
      const parentLink = allLinks.find(link => link.name === currentPageObj.belongsTo);
      setCurrentPage(parentLink ? parentLink.name : 'Unknown');
    } else {
      setCurrentPage(currentPageObj ? currentPageObj.name : 'Unknown');
    }
  }, [location.pathname]);




  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      // Call the logout API
      await axios.post('/api/logout', null, {
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${token}`,
        },
      });
      logout();
      // Redirect to the signup page
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };


  return (

    <div className="">

      <nav className="flex justify-between px-8 items-center py-6  ">
        <div className="flex items-center gap-8">
          <section className="flex items-center gap-4">
            {/* menu */}
            <FiMenu
              onClick={() => setMenu(true)}
              className={`text-3xl cursor-pointer lg:hidden ${isSideMenuOpen ? 'hidden' : ''}`}
            />
            {/* current page name */}
            <div className="text-3xl text-custom-blue font-semibold font-montserrat">
              {currentPage}
            </div>
          </section>
          
        </div>

        {/* sidebar mobile menu */}
        <div
          className={`fixed h-full w-screen lg:hidden bg-black/50  backdrop-blur-sm top-0 right-0  -translate-x-full transition-all ${isSideMenuOpen ? 'translate-x-0' : ''}`}
        >
          <section className="text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-56 flex  ">
            <IoCloseOutline
              onClick={() => setMenu(false)}
              className="mt-0 mb-8 text-3xl cursor-pointer"
            />

           
          </section>
        </div>

        {/* last section */}
        <section className="flex items-center gap-7">
          {/* cart icon */}
          <IoNotificationsOutline className="text-3xl " />
          <div className='text-user-name'>
            <p>Sade Williems</p>
          </div>
          {/* avtar img */}
          <img
            width={70}
            height={70}
            className="h-10 w-10 rounded-full "
            src = {Image}
            alt="avatar-img"
          />
          <IoSettingsOutline className="text-3xl" />

          <TbLogout2 className="text-3xl" onClick={handleLogout} />
        </section>
      </nav>
      <hr className=" " />

    </div>


  );
};

export default Navbar;
