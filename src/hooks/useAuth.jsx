/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { AuthContext } from '../authentication/AuthProvider';

const useAuth = () => {
    return useContext(AuthContext)
};

export default useAuth;