import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from '../layout/Root';
import Error from '../components/Error';
import Home from '../HomePage/Home';
import AvailableCampPage from '../AvailableCampPage/AvailableCampPage';
import About from '../AboutPage/About';
import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard/Dashboard';
import Analytics from '../components/Dashboard/NormalUser/Analytics';
import ParticipentProf from '../components/Dashboard/NormalUser/ParticipentProf';
import RegisterCamps from '../components/Dashboard/NormalUser/RegisterCamps';
import PaymentHistory from '../components/Dashboard/NormalUser/PaymentHistory';
import Profile from '../components/Dashboard/Admin/Profile';
import AddCamp from '../components/Dashboard/Admin/AddCamp';
import ManageCamp from '../components/Dashboard/Admin/ManageCamp';
import ManageRegCamp from '../components/Dashboard/Admin/ManageRegCamp';

const router = createBrowserRouter([
    {
      path: "/",
      element:<Root></Root>,
      errorElement:<Error></Error>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        }
        ,
        {
            path:'/availableCamp',
            element:<AvailableCampPage></AvailableCampPage>
        },
        {
            path:'/about',
            element:<About></About>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/register',
          element:<Register></Register>
        },
        
      ]
    },
    {
      path:'dashboard',
      element:<Dashboard></Dashboard>,
      children:[
        // normal user route
        {
          path:'analytics',
          element:<Analytics></Analytics>
        },
        {
          path:'participentProfile',
          element:<ParticipentProf></ParticipentProf>
        },
        {
          path:'registerCamps',
          element:<RegisterCamps></RegisterCamps>
        },
        {
          path:'paymentHistory',
          element:<PaymentHistory></PaymentHistory>
        },
        // admin route 
        {
          path:'profile',
          element:<Profile></Profile>
        },
        {
          path:'addCamp',
          element:<AddCamp></AddCamp>
        },
        {
          path:'manageCamp',
          element:<ManageCamp></ManageCamp>
        },
        {
          path:'manageRegisterCamp',
          element:<ManageRegCamp></ManageRegCamp>
        }
      ]
    }
  ]);

export default router;