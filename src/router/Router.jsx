/* eslint-disable no-unused-vars */
import React from "react";
import { createBrowserRouter, } from "react-router-dom";
import MainLayout from "../layout/MainLayout";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
    },
]);