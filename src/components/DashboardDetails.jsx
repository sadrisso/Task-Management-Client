/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaArrowsTurnToDots } from 'react-icons/fa6';
import { GiProgression } from 'react-icons/gi';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import useAxios from '../hooks/useAxios';
import { FaCheckCircle, FaPlus, FaSpinner, FaTasks } from 'react-icons/fa';

const DashboardDetails = () => {

    const axiosInstance = useAxios()

    const {data: total} = useQuery({
        queryKey: ['total'],
        queryFn: async () => {
            const res = await axiosInstance.get("tasks")
            return res?.data
        }
    })

    const { data: todo, refetch: refetchTodos } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const res = await axiosInstance.get("todo?category=To Do")
            return res?.data
        }
    })

    const { data: inProgress, refetch: refetchInprogress } = useQuery({
        queryKey: ['inProgress'],
        queryFn: async () => {
            const res = await axiosInstance.get("inProgress?category=In Progress")
            return res?.data
        }
    })

    const { data: done, refetch: refetchDones } = useQuery({
        queryKey: ['done'],
        queryFn: async () => {
            const res = await axiosInstance.get("done?category=Done")
            return res?.data
        }
    })


    return (
        <div className="min-h-screen bg-gray-100 p-6 md:pl-60 pt-16">

            {/* Task Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center space-x-4">
                        <FaTasks className="text-4xl text-blue-500" />
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Total Tasks</h2>
                            <p className="text-3xl font-semibold">{total?.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center space-x-4">
                        <FaSpinner className="text-4xl text-yellow-500" />
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">In Progress</h2>
                            <p className="text-3xl font-semibold">{inProgress?.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center space-x-4">
                        <FaCheckCircle className="text-4xl text-green-500" />
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Completed</h2>
                            <p className="text-3xl font-semibold">{done?.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Task Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">To Do</h2>
                    {
                        todo?.map((item, i) =>
                            <ul key={i} className="space-y-3">
                                <li className="bg-white p-4 rounded-lg shadow-sm mb-2">{item?.title}</li>
                            </ul>)
                    }
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">In Progress</h2>
                    {
                        inProgress?.map((item, i) =>
                            <ul key={i} className="space-y-3">
                                <li className="bg-white p-4 rounded-lg shadow-sm mb-2">{item?.title}</li>
                            </ul>)
                    }
                </div>
                <div className="bg-green-50 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Done</h2>
                    {
                        done?.map((item, i) =>
                            <ul key={i} className="space-y-3">
                                <li className="bg-white p-4 rounded-lg shadow-sm mb-2">{item?.title}</li>
                            </ul>)
                    }
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                <ul className="space-y-3">
                    <li className="p-4 rounded-lg bg-gray-50">Task 1 was moved to In Progress</li>
                    <li className="p-4 rounded-lg bg-gray-50">Task 2 was completed</li>
                    <li className="p-4 rounded-lg bg-gray-50">Task 3 was created</li>
                </ul>
            </div>

            {/* Add Task Button */}
            <button className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all">
                <FaPlus className="text-2xl" />
            </button>
        </div >
    );
};


export default DashboardDetails;