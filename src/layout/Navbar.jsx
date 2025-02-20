/* eslint-disable no-unused-vars */
import React from 'react';


const Navbar = () => {

    return (
        <div>
            <div className="navbar bg-base-100 fixed z-10">
                <div className='text-center mx-auto px-8 md:px-2'>
                    <h1 className='text-xl md:text-3xl font-semibold text-center'>Task Management App</h1>
                    <p className='text-gray-500'>manage all your tasks here</p>
                </div>
            </div>
        </div>
    );
};

export default Navbar;