import React from "react";
import { NavLink, Outlet } from "react-router-dom";
// import useAdmin from "../hooks/useAdmin";
// import useCard from "../hooks/useCard";

const Dashboard = () => {

  // TODO: get isAdmin value from the db
//   const [isAdmin] = useAdmin();
//   const [cart] = useCard()

  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-orange-600">
        <ul className="menu">
         {/* {
          isAdmin? <> */}
           <li>
            <NavLink to="/dashboard/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addCamp">
              
              Add a camp</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manageCamp"> Manage camp</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manageRegisterCamp">Manage Register camps</NavLink>
          </li>
          {/* <li>
            <NavLink to="/dashboard/users">All Users</NavLink>
          </li> */}
          
          {/* </> : <> */}
           <li>
            <NavLink to="/dashboard/analytics">Analytics</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/participentProfile">Participent Profile</NavLink>
          </li>
          <li>
            {/* <NavLink to="/dashboard/cart">My Cart({cart.length})</NavLink> */}
            <NavLink to="/dashboard/registerCamp">RegisterCamps</NavLink>
          </li>
          
          <li>
            <NavLink to="/dashboard/paymentHistory">Real Payment History</NavLink>
          </li>
          {/* </> */}
         {/* } */}
          {/* shared li */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
