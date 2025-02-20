/* eslint-disable no-unused-vars */
import React from 'react';
import useAuth from '../hooks/useAuth';

const Home = () => {



    return (
        <div className='flex flex-col md:flex-row'>
            <div className='h-[200px] md:min-h-[calc(100vh-120px)] bg-[#1D232A] text-white md:w-[300px]'>
                left
            </div>
            <div className='h-[500px] md:min-h-[calc(100vh-120px)] bg-base-200 md:w-[1563px]'>
                right
            </div>
        </div>
    );
};

export default Home;