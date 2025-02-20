/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import useAxios from '../hooks/useAxios';


const MyTasks = () => {

    const axiosInstance = useAxios()
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axiosInstance.get("tasks")
            .then((res) => {
                console.log(res?.data)
                setTasks(res?.data)
            })
    }, [])


    return (
        <div className='pt-14 md:pl-64'>
            <div className='text-3xl py-5'>
                <h1>All Tasks</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
                {
                    tasks?.map((task, i) =>
                        <div key={i}>
                            <div className="card bg-white shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">{task?.title}</h2>
                                    <p>{task?.description}</p>
                                    <div className="card-actions justify-end">
                                        <p>{task?.timestamp}</p>
                                        <p>{task?.category}</p>
                                    </div>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default MyTasks;