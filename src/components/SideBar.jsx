/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { CiLogin } from 'react-icons/ci';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const SideBar = () => {

    const { user } = useAuth()
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('sign out successfully')
                navigate("/login")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {/* Hamburger Menu Button (Visible on Small Screens) */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-20 p-2 bg-gray-800 text-white rounded-lg lg:hidden"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </button>

            {/* Sidebar */}
            <div
                className={`bg-gray-800 text-white w-64 min-h-screen p-5 fixed z-10 overflow-auto transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0`}
            >
                <h2 className="text-xl font-bold text-blue-400">
                    Task <span className="text-white">Pro</span>
                </h2>
                <div className="mt-5">
                    {/* User Profile */}
                    <div className="flex items-center space-x-2">
                        <div className="w-14 h-14 bg-gray-700 rounded-full" />
                        <span>@john</span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="mt-5 space-y-3">
                        <Link onClick={toggleSidebar} to="/" className="block p-2 hover:bg-gray-700 rounded">
                            Home
                        </Link>
                        <Link onClick={toggleSidebar} to="/tasks" className="block p-2 hover:bg-gray-700 rounded">
                            Tasks
                        </Link>
                        <Link onClick={toggleSidebar} to="/addTask" className="block p-2 hover:bg-gray-700 rounded">
                            Add Task
                        </Link>
                        <Link onClick={toggleSidebar} to="/allTasks" className="block p-2 hover:bg-gray-700 rounded">
                            My Task
                        </Link>
                        {user ? (
                            <Link
                                onClick={handleSignOut}
                                className="block p-2 hover:bg-gray-700 rounded"
                            >
                                Logout
                            </Link>
                        ) : (
                            <Link
                                onClick={toggleSidebar}
                                to="/login"
                                className="block p-2 hover:bg-gray-700 rounded"
                            >
                                Login
                            </Link>
                        )}
                    </nav>
                </div>
            </div>

            {/* Overlay for Small Screens (Closes Sidebar When Clicked) */}
            {isSidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-opacity-50 z-0 lg:hidden"
                ></div>
            )}
        </>
    );
};

export default SideBar;