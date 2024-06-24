import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../apiConfig';



import logo from '../img/log.svg';
import { mainLinks, allLinks } from '../helpers/LinkDetails';



const Sidebar = () => {

  const [open, setOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
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





  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (

    <section className='w-50% flex '>
      <div
        className={`bg-gradient-to-b from-mygard-1  to-mygard-2 to-90% min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4 	`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >

        <div className="mt-4 flex flex-col gap-4">
          {mainLinks?.map((menu, i) => (
            <div key={i}>
              <Link
                to={menu?.link}
                onClick={menu.dropdown ? toggleDropdown : null}
                className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md ${currentPath === menu.link && 'bg-white text-custom-blue'}`}
              >

                <div>{React.createElement(menu?.icon, { size: "20" })}</div>

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
              {menu.dropdown && dropdownOpen && (
                <div className={`pl-8 ${open ? "block" : "hidden"}`}>
                  {allLinks.filter(link => link.belongsTo === menu.name).map((subLink, j) => (
                    <Link
                      key={j}
                      to={subLink.link}
                      className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md ${currentPath === subLink.link && 'bg-white text-custom-blue'}`}
                    >
                      {subLink.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;