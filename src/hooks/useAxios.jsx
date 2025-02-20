/* eslint-disable no-unused-vars */
import axios from 'axios';
import React from 'react';

const useAxios = () => {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:4000/',
    });

    return axiosInstance
};

export default useAxios;