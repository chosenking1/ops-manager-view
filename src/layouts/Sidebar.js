import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../apiConfig';



import logo from '../img/ibedc.jpg';
import { mainLinks } from '../helpers/LinkDetails';



const Sidebar = () => {
  const Links = [
    { name: 'HOME', link: '/task' },
    { name: 'CREATE TASK', link: '/task/create' },
    { name: 'CREATE DEPARTMENT', link: '/department/create' },
  ];

  // const [open, setOpen] = useState(true);
  // const menus = [
  //   { name: "IBEDC", icon: logo, gap: true },

  //   { name: "Dashboard", icon: MdOutlineDashboard, link: "/" },
  //   { name: "Customers ", icon: HiUsers, link: "/customers" },
  //   { name: "Enumeration", icon: TiDocumentText },
  //   { name: "Meter Reading", icon: MdOutlineGasMeter, gap: true },

  //   { name: "DT Meter Reading", icon: MdOutlineGasMeter },
  //   { name: "Bill Distribution", icon: MdOutlineDashboard },
  //   { name: "DSS ", icon: IoDocumentTextOutline, gap: true },
  //   { name: "CRO Management", icon: ImUsers },
  //   { name: "CRO Route Map", icon: MdOutlineRoute },
  //   { name: "Performance ", icon: MdInsights },
  //   { name: "Evaluation", icon: RxSpeakerModerate },
  //   { name: "MD Audit", icon: FaPenSquare, gap: true },

  //   { name: "Disconnection", icon: FaCloudBolt },
  //   { name: "Reconnection", icon: TbCloudDataConnection },
  //   { name: "DT Complaint ", icon: RiCustomerService2Fill, gap: true },
  //   { name: "Customer Engagement", icon: TbUsersGroup },
  // ];

  const [open, setOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');




  // const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  axios.defaults.baseURL = apiUrl;


  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };


  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkAuthentication();
  }, [location]);

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
      // Remove the token from localStorage
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      // Redirect to the signup page
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const onToggleMenu = () => {
    setOpen(!open);
  };
  return (

    <section className='w-50% flex'>
      <div
        className={`bg-gradient-to-b from-mygard-1  to-mygard-2 to-90% min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >

        <div className="mt-4 flex flex-col gap-4">
          {mainLinks?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md ${currentPath === menu.link && 'bg-white text-custom-blue '}`}
            >
              

              { (
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              )}
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>

    </section>


  );
};

export default Sidebar;