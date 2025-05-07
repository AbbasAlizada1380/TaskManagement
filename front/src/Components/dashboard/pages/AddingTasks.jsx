import React, { useEffect, useState } from "react";

const AddingTasks = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
    priority: "",
    status: "",
    maxTime: "",
    category: "",
    note: "",
    user: "",
  });

  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      maxTime: formData.maxTime
        ? new Date(formData.maxTime).toISOString()
        : null,
    };

    try {
      const res = await fetch(
        `${BASE_URL}/api/tasks${editingTaskId ? `/${editingTaskId}` : ""}`,
        {
          method: editingTaskId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to submit task");

      const savedTask = await res.json();

      if (editingTaskId) {
        setTasks((prev) =>
          prev.map((t) => (t.id === savedTask.id ? savedTask : t))
        );
      } else {
        setTasks((prev) => [...prev, savedTask]);
      }

      setFormData({
        title: "",
        description: "",
        project: "",
        priority: "",
        status: "",
        maxTime: "",
        category: "",
        note: "",
        user: "",
      });
      setEditingTaskId(null);
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

  const handleEdit = (task) => {
    setFormData({
      title: task.title || "",
      description: task.description || "",
      project: task.project || "",
      priority: task.priority || "",
      status: task.status || "",
      maxTime: task.maxTime ? task.maxTime.slice(0, 16) : "",
      category: task.category || "",
      note: task.note || "",
      user: task.user || "",
    });
    setEditingTaskId(task.id);
  };

  const handleDelete = async (taskId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");

      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
        Tasks Form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
      >
        {[
          { name: "user", label: "Duty of" },
          { name: "title", label: "Title" },
          { name: "description", label: "Description" },
          { name: "project", label: "Project" },
        ].map(({ name, label }) => (
          <div key={name} className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">{label}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}
        {/* Priority dropdown */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Priority</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
        {/* maxTime datetime picker */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Max Time</label>
          <input
            type="datetime-local"
            name="maxTime"
            value={formData.maxTime}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {/* Status dropdown */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Status</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="COMPLETE">Complete</option>
            <option value="CANCELED">Canceled</option>
          </select>
        </div>{" "}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select category</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </div>
        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {editingTaskId ? "Update Task" : "Submit Task"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500 col-span-full">No tasks available.</p>
        ) : (
          tasks.map((task) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default AddingTasks;
