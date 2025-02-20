/* eslint-disable no-unused-vars */
import React from 'react';
import TaskCard from './TaskCard';
import { FaCheckCircle, FaClock, FaExclamationCircle, FaTasks } from 'react-icons/fa';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="flex">
            <div>
                <SideBar />
            </div>
            <div className="flex-1 p-10 bg-gray-100 min-h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;

<div className="grid grid-cols-3 gap-5">
    <TaskCard title="My Tasks" count={10} icon={FaTasks} />
    <TaskCard title="Overdue" count={2} icon={FaExclamationCircle} />
    <TaskCard title="No Deadline" count={0} icon={FaClock} />
    <TaskCard title="Pending" count={7} icon={FaClock} />
    <TaskCard title="In Progress" count={1} icon={FaTasks} />
    <TaskCard title="Completed" count={2} icon={FaCheckCircle} />
</div>