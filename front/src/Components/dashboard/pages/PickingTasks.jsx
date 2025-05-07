import React, { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const PickingTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/tasks`); // Replace with your actual base URL if needed
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

  const handlePickTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, picked: !task.picked } : task
      )
    );
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
            } text-white`} // Ensures all text is white and readable
          >
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
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(task)}
                className="text-blue-100 hover:text-blue-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-100 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickingTasks;
