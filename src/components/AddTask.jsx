/* eslint-disable no-unused-vars */
import React from 'react';
import useAxios from '../hooks/useAxios';
import { toast } from 'react-toastify';

const AddTask = () => {

    const axiosInstance = useAxios()

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value;
        const description = form.description.value;
        const category = form.status.value;
        const timestamp = form.timestamp.value;

        const taskInfo = { title, description, category, timestamp }
        console.log(taskInfo)
        form.reset()

        axiosInstance.post("tasks", taskInfo)
            .then((res) => {
                if (res?.data?.insertedId) {
                    toast.success("Task Added")
                }
                console.log(res?.data)
            })
    }


    return (
        <div className="p-4 max-w-xl mx-auto mt-10">

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 shadow-xl">
                <h2 className="text-2xl font-semibold mb-4">Add Task</h2>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name='title'
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name='description'
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Category:
                    </label>
                    <select
                        id="status"
                        name='status'
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="timestamp"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Timestamp:
                    </label>
                    <input
                        type="datetime-local"
                        id="timestamp"
                        name='timestamp'
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <button
                    type="submit"
                    className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                >
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default AddTask;