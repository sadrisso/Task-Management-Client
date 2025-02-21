/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';

const TaskDetails = () => {

    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const axiosInstance = useAxios()
    const [task, setTask] = useState({})

    useEffect(() => {
        axiosInstance.get(`task/${id}`)
            .then((res) => {
                console.log(res?.data)
                setTask(res?.data)
                setLoading(false)
            })
    }, [])


    return (
        <div className='mt-20 md:ml-60'>
            {
                loading ?
                    <div className="text-3xl text-center"><span className="loading loading-spinner loading-xl"></span></div>
                    :
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                        <h2>{task?.title}</h2>
                        <p className="text-xs text-gray-500">{task?.description}</p>
                        <p className="text-xs text-gray-500">{task?.category}</p>
                        <p className="text-xs text-gray-500">{task?.timestamp}</p>
                    </div>
            }
        </div>
    );
};

export default TaskDetails;