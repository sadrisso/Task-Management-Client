/* eslint-disable no-unused-vars */
import React from 'react';
import useAuth from '../hooks/useAuth';

const Home = () => {



    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Task Management App</h1>
                <p className="text-gray-600">Stay organized and productive</p>
            </header>

            {/* Add Task Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled // Disabled for static design
                    />
                    <button
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled
                    >
                        Add Task
                    </button>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-4 mb-6">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    All
                </button>
                <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    Active
                </button>
                <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    Completed
                </button>
            </div>

            {/* Task List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <ul className="space-y-4">
                    {/* Task Item 1 */}
                    <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                            <input
                                type="checkbox"
                                className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                                disabled
                            />
                            <span className="text-gray-800">Complete project proposal</span>
                        </div>
                        <button
                            className="text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            disabled
                        >
                            Delete
                        </button>
                    </li>

                    {/* Task Item 2 */}
                    <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                            <input
                                type="checkbox"
                                className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                                checked
                                disabled
                            />
                            <span className="text-gray-800 line-through">
                                Schedule team meeting
                            </span>
                        </div>
                        <button
                            className="text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            disabled
                        >
                            Delete
                        </button>
                    </li>

                    {/* Task Item 3 */}
                    <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                            <input
                                type="checkbox"
                                className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                                disabled
                            />
                            <span className="text-gray-800">Review client feedback</span>
                        </div>
                        <button
                            className="text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            disabled
                        >
                            Delete
                        </button>
                    </li>
                </ul>
            </div>
        </div>

    );
};

export default Home;





{/* <div className='flex flex-col md:flex-row'>
    <div className='h-[200px] md:min-h-[calc(100vh-120px)] bg-[#1D232A] text-white md:w-[300px]'>
        left
    </div>
    <div className='h-[500px] md:min-h-[calc(100vh-120px)] bg-base-200 md:w-[1563px]'>
        right
    </div>
</div> */}