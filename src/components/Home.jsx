/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";
import { FaPen, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { FcViewDetails } from "react-icons/fc";

const Home = () => {
    const axiosInstance = useAxios();
    const [todo, setTodo] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [done, setDone] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true)
    const [editingTask, setEditingTask] = useState(null); // Track the task being edited

    // Fetch tasks for each category
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axiosInstance.get("todo?category=To Do")
            .then(res => {
                setTodo(res?.data)
                setLoading(false)
            })
            .catch(error => console.error("Error fetching To Do tasks:", error));

        axiosInstance.get("inProgress?category=In Progress")
            .then(res => {
                setInProgress(res?.data)
                setLoading(false)
            })
            .catch(error => console.error("Error fetching In Progress tasks:", error));

        axiosInstance.get("done?category=Done")
            .then(res => {
                setDone(res?.data)
                setLoading(false)
            })
            .catch(error => console.error("Error fetching Done tasks:", error));
    };

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
                        fetchTasks(); // Refetch tasks
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
                        fetchTasks(); // Refetch tasks
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
    const handleDelete = (taskId, category) => {
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
                            fetchTasks(); // Refetch tasks
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
        <div className="mt-10 md:ml-52 min-h-screen bg-gray-100 p-4 sm:p-6">
            {
                loading ?
                    <div className="text-3xl text-center"><span className="loading loading-spinner loading-xl"></span></div>
                    :
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* To Do Column */}

                        <div className="bg-gray-200 rounded-lg p-4 w-full sm:w-72">
                            <h2 className="text-lg font-semibold mb-4">To Do</h2>
                            <div className="space-y-2">
                                {todo?.map((item, i) => (
                                    <ul key={i}>
                                        <Link to={`task/${item?._id}`} className="hover:text-red-400">
                                            <div className="bg-white rounded-lg p-3 shadow-sm">
                                                <h2>{item?.title}</h2>
                                                <p className="text-xs text-gray-500">{item?.description}</p>
                                                <p className="text-xs text-gray-500">{item?.category}</p>
                                                <p className="text-xs text-gray-500">{item?.timestamp}</p>
                                                <div className="space-x-1.5 text-right">
                                                    <button
                                                        onClick={() => handleDelete(item._id, item.category)}
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

                                                </div>
                                            </div>
                                        </Link>
                                    </ul>
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

                        <div className="bg-gray-200 rounded-lg p-4 w-full sm:w-72">
                            <h2 className="text-lg font-semibold mb-4">In Progress</h2>
                            <div className="space-y-2">
                                {inProgress.map((item, i) => (
                                    <ul key={i}>
                                        <Link to={`task/${item?._id}`} className="hover:text-red-400">
                                            <div className="bg-white rounded-lg p-3 shadow-sm">
                                                <h2>{item?.title}</h2>
                                                <p className="text-xs text-gray-500">{item?.description}</p>
                                                <p className="text-xs text-gray-500">{item?.category}</p>
                                                <p className="text-xs text-gray-500">{item?.timestamp}</p>
                                                <div className="space-x-1.5 text-right">
                                                    <button
                                                        onClick={() => handleDelete(item._id, item.category)}
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
                                                </div>
                                            </div>
                                        </Link>
                                    </ul>
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

                        <div className="bg-gray-200 rounded-lg p-4 w-full sm:w-72">
                            <h2 className="text-lg font-semibold mb-4">Done</h2>
                            <div className="space-y-2">
                                {done.map((item, i) => (
                                    <ul key={i}>
                                        <Link to={`task/${item?._id}`} className="hover:text-red-400">
                                            <div className="bg-white rounded-lg p-3 shadow-sm">
                                                <h2>{item?.title}</h2>
                                                <p className="text-xs text-gray-500">{item?.description}</p>
                                                <p className="text-xs text-gray-500">{item?.category}</p>
                                                <p className="text-xs text-gray-500">{item?.timestamp}</p>
                                                <div className="space-x-1.5 text-right">
                                                    <button
                                                        onClick={() => handleDelete(item._id, item.category)}
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
                                                </div>
                                            </div>
                                        </Link>
                                    </ul>
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
            }

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

