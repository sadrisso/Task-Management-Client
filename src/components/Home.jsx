/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4 md:p-10">
            <div className="flex flex-col md:flex-row mt-5 md:ml-52">
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </label>
                <div>
                    <Link to="/addTask" className="btn">Add </Link>
                    <Link to="/tasks" className="btn">All Tasks </Link>
                </div>
            </div>
            <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-4 gap-4 md:ml-52">
                <div className="border">
                    <h1 className="text-2xl">ToDo</h1>
                </div>
                <div className="border">
                    <h1 className="text-2xl">In Progress</h1>
                </div>
                <div className="border">
                    <h1 className="text-2xl">Completed</h1>
                </div>
                <div className="border">
                    <h1 className="text-2xl">Rejected</h1>
                </div>
            </div>
        </div>
    );
};

export default Home;
