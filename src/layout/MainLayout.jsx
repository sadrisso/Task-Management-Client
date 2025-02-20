/* eslint-disable no-unused-vars */
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
    return (
        <div className=''>
            <div className=''>
                <Navbar />
            </div>
            <div className='min-h-screen bg-[#EDF2FA]'>
                <Outlet />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </div>
    );
};

export default MainLayout;