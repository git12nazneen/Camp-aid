import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from '../layout/Root';
import Error from '../components/Error';
import Home from '../HomePage/Home';
import AvailableCampPage from '../AvailableCampPage/AvailableCampPage';
import About from '../AboutPage/About';

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
        }
      ]
    },
  ]);

export default router;