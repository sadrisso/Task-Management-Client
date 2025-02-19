/* eslint-disable no-unused-vars */
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className=''>
            <div className=''>
                <Navbar />
            </div>
            <div className='min-h-[calc(100vh-120px)]'>
                <Outlet />
            </div>
            <div className=''>
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;