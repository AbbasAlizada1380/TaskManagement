import React, { useEffect, useState } from "react";

const AddingTasks = () => {
  const [formData, setFormData] = useState({
    dutyOf: "",
    description: "",
    project: "",
    priority: "",
    status: "",
    maxTime: "",
    category: "",
    notes: "",
  });

  const [tasks, setTasks] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [editingTaskId, setEditingTaskId] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: formData.dutyOf,
      description: formData.description,
      project: formData.project,
      category: formData.category,
      status: formData.status,
      priority:formData.priority,
      user: formData.dutyOf, // You can adjust this if dynamic
      updatedAt: new Date(),
    };
    try {
      const res = await fetch(`${BASE_URL}/api/tasks`, {
        method: editingTaskId ? "PUT" : "POST", // Use PUT for update
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit task");

      const savedTask = await res.json();

      if (editingTaskId) {
        setTasks(
          tasks.map((task) => (task.id === savedTask.id ? savedTask : task))
        ); // Update task in the list
      } else {
        setTasks([...tasks, savedTask]); // Add the saved task to the UI
      }

      setFormData({
        dutyOf: "",
        description: "",
        project: "",
        priority: "",
        status: "",
        maxTime: "",
        category: "",
        notes: "",
      });
      setEditingTaskId(null); // Reset editing state
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/tasks`);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleMouseDown = (e, index) => {
    setDraggedIndex(index);
    setDragging(true);
    const { clientX, clientY } = e;
    setDragPosition({ x: clientX, y: clientY });
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    if (!dragging || draggedIndex === null) return;

    const { clientX, clientY } = e;
    const diffX = clientX - dragPosition.x;
    const diffY = clientY - dragPosition.y;

    setDragPosition({ x: clientX, y: clientY });

    const updatedTasks = [...tasks];
    updatedTasks[draggedIndex] = {
      ...updatedTasks[draggedIndex],
      position: {
        x: updatedTasks[draggedIndex].position?.x + diffX || diffX,
        y: updatedTasks[draggedIndex].position?.y + diffY || diffY,
      },
    };

    setTasks(updatedTasks);
  };

  const handleMouseUp = () => {
    setDragging(false);
    setDraggedIndex(null);
    document.body.style.userSelect = "auto";
  };

  const handleEdit = (task) => {
    setFormData({
      dutyOf: task.title,
      description: task.description,
      project: task.project,
      priority: task.priority,
      status: task.status,
      maxTime: task.maxTime,
      category: task.category,
      notes: task.notes,
    });
    setEditingTaskId(task.id); // Set editing task ID
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", // Ensure the right header
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      // Handle successful deletion
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      // Handle the error accordingly
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      className="container mx-auto relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
        Tasks Form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
      >
        {[
          { name: "dutyOf", label: "Duty Of" },
          { name: "description", label: "Description" },
          { name: "project", label: "Project" },
          { name: "priority", label: "Priority" },
          { name: "status", label: "Status" },
          { name: "maxTime", label: "Max Time" },
          { name: "category", label: "Category" },
          { name: "notes", label: "Notes" },
        ].map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              {field.label}
            </label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {editingTaskId ? "Update Task" : "Submit Task"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tasks.length === 0 && (
          <p className="text-gray-500 col-span-full">No tasks available.</p>
        )}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white shadow-md rounded p-4 border border-gray-200"
          >
            <h3 className="font-bold text-blue-600 mb-1">{task.title}</h3>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Project:</strong> {task.project}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Priority:</strong> {task.priority}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Status:</strong> {task.status}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Time:</strong> {task.maxTime}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Category:</strong> {task.category}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Created at:</strong> {task.createdAt}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Updated at:</strong> {task.updatedAt}
            </p>
            <p className="text-xs text-gray-500 mt-2">{task.description}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(task)}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-600 hover:text-red-800"
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

export default AddingTasks;
