import React, { useState } from "react";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTasks([...tasks, formData]); // Add to local state
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
  };

  const handleMouseDown = (e, index) => {
    setDraggedIndex(index);
    setDragging(true);

    // Start dragging, set the initial position
    const { clientX, clientY } = e;
    setDragPosition({ x: clientX, y: clientY });

    // Prevent text selection during dragging
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    if (!dragging || draggedIndex === null) return;

    // Calculate how much the mouse has moved
    const { clientX, clientY } = e;
    const diffX = clientX - dragPosition.x;
    const diffY = clientY - dragPosition.y;

    // Update the position of the dragged task
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

    // Allow text selection again after dragging
    document.body.style.userSelect = "auto";
  };

  return (
    <div
      className="container mx-auto relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Stop dragging when the mouse leaves the container
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
          Submit Task
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      <div className="flex flex-wrap gap-4 relative">
        {tasks.length === 0 && (
          <p className="text-gray-500">No tasks available.</p>
        )}
        {tasks.map((task, index) => (
          <div
            key={index}
            className="w-60 bg-white shadow-md rounded p-4 cursor-move border border-gray-200"
            onMouseDown={(e) => handleMouseDown(e, index)} // Listen for mouse down event to start dragging
            style={{
              position: "absolute",
              left: task.position?.x || 0,
              top: task.position?.y || 0,
              userSelect: "none", // Prevent text selection while dragging
            }}
          >
            <h3 className="font-bold text-blue-600 mb-1">{task.dutyOf}</h3>
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
            <p className="text-xs text-gray-500 mt-2">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddingTasks;
