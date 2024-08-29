
import  { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hook/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex">
      {/* Overlay for mobile view */}
      <div
        className={`fixed z-20 inset-0 bg-black bg-opacity-50 lg:hidden ${
          isSidebarVisible ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div className="flex lg:static">
        <div
          className={`fixed lg:static z-30 transition-transform transform ${
            isSidebarVisible ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 w-64 min-h-screen bg-sky-400`}
        >
          <ul className="menu p-4">
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/profile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addCamp">Add a camp</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageCamp">Manage camp</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageRegisterCamp">
                    Manage Register camps
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/users">All Users</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/analytics">Analytics</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/participentProfile">
                    Participent Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/registerCamps">Register Camps</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/paymentHistory">
                    Real Payment History
                  </NavLink>
                </li>
              </>
            )}
            <div className="divider"></div>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="p-4 lg:hidden">
          <button
            onClick={toggleSidebar}
            className="btn btn-sm bg-sky-500 text-white"
          >
            {isSidebarVisible ? "Close Sidebar" : "Open Sidebar"}
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
