import React, { useState } from "react";

const PickingTasks = () => {
  // Mock initial task data with all additional properties
  const initialTasks = [
    {
      id: 1,
      task: "Complete project report",
      picked: false,
      user: "Alice",
      priority: "High",
      maxTime: "3 hours",
      project: "Project Alpha",
      description: "Complete the final report for Project Alpha.",
      status: "In Progress",
      category: "Documentation",
      notes: "Ensure the report includes all required graphs.",
    },
    {
      id: 2,
      task: "Attend team meeting",
      picked: false,
      user: "Bob",
      priority: "Medium",
      maxTime: "2 hours",
      project: "Project Beta",
      description: "Attend the weekly team meeting to discuss project updates.",
      status: "Pending",
      category: "Meeting",
      notes: "Prepare updates for current sprint.",
    },
    {
      id: 3,
      task: "Fix bug in code",
      picked: false,
      user: "Charlie",
      priority: "Low",
      maxTime: "1 hour",
      project: "Project Gamma",
      description: "Fix the bug causing app crashes when saving data.",
      status: "In Progress",
      category: "Development",
      notes: "Test thoroughly after fixing.",
    },
    {
      id: 4,
      task: "Review pull requests",
      picked: false,
      user: "Alice",
      priority: "Medium",
      maxTime: "1.5 hours",
      project: "Project Alpha",
      description:
        "Review and approve pending pull requests for Project Alpha.",
      status: "Pending",
      category: "Code Review",
      notes: "Check for proper documentation in the code.",
    },
    {
      id: 5,
      task: "Update documentation",
      picked: false,
      user: "Bob",
      priority: "Low",
      maxTime: "2 hours",
      project: "Project Beta",
      description: "Update the project documentation with the latest changes.",
      status: "In Progress",
      category: "Documentation",
      notes: "Include new API endpoints.",
    },
  ];

  // State to hold the tasks and their picked status
  const [tasks, setTasks] = useState(initialTasks);

  // Function to handle picking a task
  const handlePickTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, picked: !task.picked } : task
      )
    );
  };

  // Function to determine background color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500"; // Red for High priority
      case "Medium":
        return "bg-yellow-500"; // Yellow for Medium priority
      case "Low":
        return "bg-green"; // Green for Low priority
      default:
        return "bg-white"; // Default white background
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Picking Tasks</h1>
      <p className="text-gray-600 mb-6">
        This is where users can pick or assign tasks to themselves.
      </p>

      {/* Display task list as cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-6 border border-gray-200 rounded-lg shadow-lg ${getPriorityColor(
              task.priority
            )} ${task.picked ? "border-green-500" : "border-gray-200"}`}
          >
            <h2
              className={`text-xl font-semibold text-white ${
                task.picked ? "line-through text-gray-300" : ""
              }`}
            >
              {task.task}
            </h2>
            <p className="text-sm text-white">Assigned to: {task.user}</p>

            <div className="mt-4">
              {/* Task Details */}
              <div className="mb-2 text-white">
                <strong>Priority: </strong>
                {task.priority}
              </div>
              <div className="mb-2 text-white">
                <strong>Max Time: </strong>
                {task.maxTime}
              </div>
              <div className="mb-2 text-white">
                <strong>Project: </strong>
                {task.project}
              </div>
              <div className="mb-2 text-white">
                <strong>Description: </strong>
                {task.description}
              </div>
              <div className="mb-2 text-white">
                <strong>Status: </strong>
                {task.status}
              </div>
              <div className="mb-2 text-white">
                <strong>Category: </strong>
                {task.category}
              </div>
              <div className="mb-2 text-white">
                <strong>Notes: </strong>
                {task.notes}
              </div>
            </div>

            {/* Pick/Unpick Button */}
            <button
              onClick={() => handlePickTask(task.id)}
              className={`w-full py-2 rounded-lg text-white ${
                task.picked ? "bg-red-700" : "bg-blue-600"
              } hover:bg-blue-700 transition duration-300`}
            >
              {task.picked ? "Unpick" : "Pick"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickingTasks;
