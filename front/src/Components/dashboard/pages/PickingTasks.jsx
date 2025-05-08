import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const PickingTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateTaskStatus = async (task, newStatus) => {
    const updatedTask = { ...task, status: newStatus };

    try {
      await axios.put(`${BASE_URL}/api/tasks/${task.id}`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
      );
    } catch (error) {
      console.error(`Failed to update task to ${newStatus}:`, error);
    }
  };

  const confirmAndUpdateStatus = (task, status, label) => {
    Swal.fire({
      title: `Are you sure you want to mark this task as ${label}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, mark as ${label}`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateTaskStatus(task, status);
        Swal.fire("Updated!", `Task marked as ${label}.`, "success");
      }
    });
  };

  if (loading) return <p className="text-center">Loading tasks...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Picking Tasks</h1>
      <p className="text-gray-600 mb-6">
        This is where users can pick or assign tasks to themselves.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`shadow-md rounded p-4 border ${
              task.priority === "HIGH"
                ? "bg-red-500"
                : task.priority === "MEDIUM"
                ? "bg-yellow-500"
                : "bg-green"
            } text-white`}
          >
            <h3 className="font-extrabold font-serif text-2xl mb-1">
              {task.title.toUpperCase()}
            </h3>
            <h3 className="font-bold mb-1">User: {task.user}</h3>
            <p className="text-sm mb-1">
              <strong>Project:</strong> {task.project}
            </p>
            <p className="text-sm mb-1">
              <strong>Priority:</strong> {task.priority}
            </p>
            <p className="text-sm mb-1">
              <strong>Status:</strong> {task.status}
            </p>
            <p className="text-sm mb-1">
              <strong>Max time:</strong> {task.maxTime}
            </p>
            <p className="text-sm mb-1">
              <strong>Category:</strong> {task.category}
            </p>
            <p className="text-sm mb-1">
              <strong>Created:</strong> {task.createdAt}
            </p>
            <p className="text-sm mb-1">
              <strong>Updated:</strong> {task.updatedAt}
            </p>
            <p className="text-xs mt-2">{task.description}</p>

            <div className="flex flex-wrap justify-between gap-2 mt-4">
              <button
                onClick={() =>
                  confirmAndUpdateStatus(task, "PROCESSING", "Processing")
                }
                className="bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
              >
                Pick
              </button>
              <button
                onClick={() =>
                  confirmAndUpdateStatus(task, "CANCELED", "Canceled")
                }
                className="bg-yellow-600 px-2 py-1 rounded hover:bg-yellow-700"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  confirmAndUpdateStatus(task, "COMPLETED", "Completed")
                }
                className="bg-lime-700 px-2 py-1 rounded hover:bg-green-700"
              >
                Done
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickingTasks;
