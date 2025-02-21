/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";
import { FaPen, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { TbListDetails } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import { MdDoneOutline } from "react-icons/md";
import { RiProgress5Line } from "react-icons/ri";
import { FaArrowsTurnToDots } from "react-icons/fa6";

const Home = () => {
    const axiosInstance = useAxios();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const { isPending: todoIsPending, data: todo, refetch: refetchTodos } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const res = await axiosInstance.get("todo?category=To Do");
            return res?.data;
        },
    });

    const { isPending: inProgressIsPending, data: inProgress, refetch: refetchInprogress } = useQuery({
        queryKey: ['inProgress'],
        queryFn: async () => {
            const res = await axiosInstance.get("inProgress?category=In Progress");
            return res?.data;
        },
    });

    const { isPending: doneIsPending, data: done, refetch: refetchDones } = useQuery({
        queryKey: ['done'],
        queryFn: async () => {
            const res = await axiosInstance.get("done?category=Done");
            return res?.data;
        },
    });

    const isLoading = todoIsPending || inProgressIsPending || doneIsPending;

    // Handle form submission (for both add and edit)
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const taskInfo = {
            title: formData.get("title"),
            description: formData.get("description"),
            category: formData.get("status"),
            timestamp: formData.get("timestamp"),
        };

        if (editingTask) {
            // Update existing task
            axiosInstance.put(`tasks/${editingTask._id}`, taskInfo)
                .then((res) => {
                    if (res?.data?.modifiedCount) {
                        toast.success("Task Updated");
                        refetchDones();
                        refetchTodos();
                        refetchInprogress();
                    }
                })
                .catch((error) => {
                    console.error("Error updating task:", error);
                    toast.error("Failed to update task");
                });
        } else {
            // Add new task
            axiosInstance.post("tasks", taskInfo)
                .then((res) => {
                    if (res?.data?.insertedId) {
                        toast.success("Task Added");
                        refetchDones();
                        refetchTodos();
                        refetchInprogress();
                    }
                })
                .catch((error) => {
                    console.error("Error adding task:", error);
                    toast.error("Failed to add task");
                });
        }

        // Reset form and close modal
        e.target.reset();
        setIsModalOpen(false);
        setEditingTask(null);
    };

    // Handle delete task
    const handleDelete = (taskId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`tasks/${taskId}`)
                    .then((res) => {
                        if (res?.data?.deletedCount) {
                            toast.success("Task Deleted");
                            refetchDones();
                            refetchTodos();
                            refetchInprogress();
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting task:", error);
                        toast.error("Failed to delete task");
                    });
            }
        });
    };

    // Handle edit task
    const handleEdit = (task) => {
        setEditingTask(task); // Set the task being edited
        setIsModalOpen(true); // Open the modal
    };

    return (
        <div className="min-h-screen bg-gray-100 mt-5 md:mt-12 md:ml-60 overflow-hidden">
            {/* Loading State */}
            {isLoading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <div className="space-y-6 p-4">
                    {/* Stats and Task Columns */}
                    <div className="">
                        {/* Stats Section */}
                        <div className="stats stats-horizontal shadow w-full my-3">
                            <div className="stat">
                                <div className="stat-figure text-blue-500">
                                    <FaArrowsTurnToDots className="text-2xl" />
                                </div>
                                <div className="stat-title">ToDo</div>
                                <div className="stat-value">{todo?.length}</div>
                            </div>

                            <div className="stat">
                                <div className="stat-figure text-yellow-500">
                                    <RiProgress5Line className="text-2xl" />
                                </div>
                                <div className="stat-title">In Progress</div>
                                <div className="stat-value">{inProgress?.length}</div>
                            </div>

                            <div className="stat">
                                <div className="stat-figure text-green-500">
                                    <MdDoneOutline className="text-2xl" />
                                </div>
                                <div className="stat-title">Done</div>
                                <div className="stat-value">{done?.length}</div>
                            </div>
                        </div>

                        {/* Task Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                            {/* To Do Column */}
                            <div className="bg-gray-200 rounded-lg p-4">
                                <h2 className="text-lg font-semibold mb-4">To Do</h2>
                                <div className="space-y-2">
                                    {todo?.map((item, i) => (
                                        <div key={i} className="bg-white rounded-lg p-3 shadow-sm">
                                            <h2>{item?.title}</h2>
                                            <p className="text-xs text-gray-500">{item?.description}</p>
                                            <p className="text-xs text-gray-500">{item?.category}</p>
                                            <p className="text-xs text-gray-500">{item?.timestamp}</p>
                                            <div className="space-x-1.5 text-right">
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="hover:text-red-500"
                                                >
                                                    <FaTrash />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="hover:text-blue-500"
                                                >
                                                    <FaPen />
                                                </button>
                                                <Link to={`task/${item?._id}`}><TbListDetails /></Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="mt-4 w-full text-gray-600 hover:text-gray-800"
                                >
                                    + Add a task
                                </button>
                            </div>

                            {/* In Progress Column */}
                            <div className="bg-gray-200 rounded-lg p-4">
                                <h2 className="text-lg font-semibold mb-4">In Progress</h2>
                                <div className="space-y-2">
                                    {inProgress?.map((item, i) => (
                                        <div key={i} className="bg-white rounded-lg p-3 shadow-sm">
                                            <h2>{item?.title}</h2>
                                            <p className="text-xs text-gray-500">{item?.description}</p>
                                            <p className="text-xs text-gray-500">{item?.category}</p>
                                            <p className="text-xs text-gray-500">{item?.timestamp}</p>
                                            <div className="space-x-1.5 text-right">
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="hover:text-red-500"
                                                >
                                                    <FaTrash />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="hover:text-blue-500"
                                                >
                                                    <FaPen />
                                                </button>
                                                <Link to={`task/${item?._id}`}><TbListDetails /></Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="mt-4 w-full text-gray-600 hover:text-gray-800"
                                >
                                    + Add a task
                                </button>
                            </div>

                            {/* Done Column */}
                            <div className="bg-gray-200 rounded-lg p-4">
                                <h2 className="text-lg font-semibold mb-4">Done</h2>
                                <div className="space-y-2">
                                    {done?.map((item, i) => (
                                        <div key={i} className="bg-white rounded-lg p-3 shadow-sm">
                                            <h2>{item?.title}</h2>
                                            <p className="text-xs text-gray-500">{item?.description}</p>
                                            <p className="text-xs text-gray-500">{item?.category}</p>
                                            <p className="text-xs text-gray-500">{item?.timestamp}</p>
                                            <div className="space-x-1.5 text-right">
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="hover:text-red-500"
                                                >
                                                    <FaTrash />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="hover:text-blue-500"
                                                >
                                                    <FaPen />
                                                </button>
                                                <Link to={`task/${item?._id}`}><TbListDetails /></Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="mt-4 w-full text-gray-600 hover:text-gray-800"
                                >
                                    + Add a task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for adding/editing a new task */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4">
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-full sm:w-96">
                        <h2 className="text-lg font-semibold mb-4">
                            {editingTask ? "Edit Task" : "Add a new task"}
                        </h2>
                        <input
                            type="text"
                            name="title"
                            defaultValue={editingTask?.title || ""}
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                            placeholder="Enter task title"
                            required
                        />
                        <textarea
                            name="description"
                            defaultValue={editingTask?.description || ""}
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                            placeholder="Enter task description"
                            required
                        />
                        <select
                            id="status"
                            name="status"
                            defaultValue={editingTask?.category || "To Do"}
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                            required
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                        <input
                            type="datetime-local"
                            id="timestamp"
                            name="timestamp"
                            defaultValue={editingTask?.timestamp || ""}
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                            required
                        />
                        <div className="flex justify-end gap-2 mt-5">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setEditingTask(null);
                                }}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                {editingTask ? "Update Task" : "Add Task"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Home;