import React from 'react';
import Nav from '../shared/Nav';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer';

const Root = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;