
import { NavLink } from "react-router-dom";


import logo from "../assets/logo.png";
import { useState } from "react";

const Nav = () => {
//   const { user, logOut } = useAuth();
//   // console.log('nav,', user)
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // logout implement

//   const handleSignOut = () => {
//     logOut().then().catch();
//     swal({
//       text: "logout success",
//       icon: "success",
//     });
//   };

  const navLinks = (
    <>
      <NavLink 
        to="/" 
        className={({ isActive }) =>
          isActive ? 'text-red-600 border-b-2 border-red-600 font-bold' : 'my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0'
        }
      >
        Home
      </NavLink>

      <NavLink 
        to="/availableCamp" 
        className={({ isActive }) =>
          isActive ? 'text-red-600 border-b-2 border-red-600 font-bold' : 'my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0'
        }
      >
        Available Camp
      </NavLink>

      <NavLink 
        to="/about" 
        className={({ isActive }) =>
          isActive ? 'text-red-600 border-b-2 border-red-600 font-bold' : 'my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0'
        }
      >
        About us
      </NavLink>


      <NavLink 
        to="/contact" 
        className={({ isActive }) =>
          isActive ? 'text-red-600 border-b-2 border-red-600 font-bold' : 'my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0'
        }
      >
        Contact
      </NavLink>
    </>
  );
  return (
    <div className="bg-opacity-60 fixed top-0 left-0 right-0 z-50 shadow-lg">
      <nav className="relative bg-sky-200 shadow  ">
        <div className="container px-6 mx-auto md:flex md:justify-between md:items-center h-20">
          <div className="flex items-center justify-between">
            <a href="#">
              <img className="w-auto h-16" src={logo} alt="" />
            </a>
            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {!isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col md:flex-row md:mx-6">{navLinks}</div>
            <div className="flex justify-center md:block">
              {/* <div>
              {user ? (
                      <>
                      <Link
                      to='/dashboard'
                      className='block  px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                     Dashboard
                    </Link>
                        <div
                          onClick={logOut}
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Login
                        </Link>
                        <Link
                          to='/signup'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
              </div> */}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;



