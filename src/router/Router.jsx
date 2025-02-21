/* eslint-disable no-unused-vars */
import React from "react";
import { createBrowserRouter, } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../components/Home";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import Dashboard from "../components/Dashboard";
import MyTasks from "../components/MyTasks";
import AddTask from "../components/AddTask";
import TaskDetails from "../components/TaskDetails";
import DashboardDetails from "../components/DashboardDetails";
import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
                children: [
                    {
                        path: "/",
                        element: <DashboardDetails />
                    },
                    {
                        path: "/tasks",
                        element: <PrivateRoute><Home /></PrivateRoute>
                    },
                    {
                        path: "/login",
                        element: <Login />
                    },
                    {
                        path: "/register",
                        element: <Register />
                    },
                    {
                        path: "/allTasks",
                        element: <PrivateRoute><MyTasks /></PrivateRoute>
                    },
                    {
                        path: "/addTask",
                        element: <PrivateRoute><AddTask /></PrivateRoute>
                    },
                    {
                        path: "/task/:id",
                        element: <PrivateRoute><TaskDetails /></PrivateRoute>
                    }
                ]
            },
        ]
    },
]);