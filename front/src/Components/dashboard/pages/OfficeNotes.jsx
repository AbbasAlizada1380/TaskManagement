import React, { useState } from "react";

const OfficeNotes = () => {
  // State to store the note content
  const [note, setNote] = useState("");
  const [notesHistory, setNotesHistory] = useState([]); // This will hold the saved notes
  const [editIndex, setEditIndex] = useState(null); // To track which note is being edited

  // Handle the input change in the textarea
  const handleInputChange = (e) => {
    setNote(e.target.value);
  };

  // Handle the save or update action
  const handleSaveNote = () => {
    if (note.trim()) {
      if (editIndex !== null) {
        // Update existing note if in edit mode
        const updatedNotes = [...notesHistory];
        updatedNotes[editIndex] = note;
        setNotesHistory(updatedNotes);
        setEditIndex(null); // Reset edit mode
      } else {
        // Add new note if not in edit mode
        setNotesHistory((prevNotes) => [...prevNotes, note]);
      }
      setNote(""); // Clear the textarea after saving or updating
    } else {
      alert("Please enter a note to save!");
    }
  };

  // Handle the delete action
  const handleDeleteNote = async (index) => {
    // Simulate an API call to delete the note from the backend
    try {
      // Replace with actual API call like:
      // await fetch(`${apiBaseUrl}/officeNotes/${index}`, { method: 'DELETE' });

      // If no backend, remove note from state
      setNotesHistory((prevNotes) => prevNotes.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note.");
    }
  };

  // Handle the edit action
  const handleEditNote = (index) => {
    setEditIndex(index);
    setNote(notesHistory[index]); // Pre-fill the textarea with the selected note for editing
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800">Office Notes</h1>
      <p className="text-gray-600 mb-4">
        Notes shared in the office environment.
      </p>

      {/* Textarea to input the note */}
      <textarea
        value={note}
        onChange={handleInputChange}
        placeholder="Write your note here..."
        rows="6"
        className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      ></textarea>

      {/* Button to save or update the note */}
      <button
        onClick={handleSaveNote}
        className="w-full px-4 py-2 mb-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {editIndex !== null ? "Update Note" : "Save Note"}
      </button>

      {/* Display the saved notes below */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Saved Notes:
        </h2>
        {notesHistory.length === 0 ? (
          <p className="text-gray-500">No notes saved yet.</p>
        ) : (
          <ul className="space-y-2">
            {notesHistory.map((savedNote, index) => (
              <li
                key={index}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{`Note ${
                    index + 1
                  }:`}</span>
                  {/* Edit button */}
                  <button
                    onClick={() => handleEditNote(index)}
                    className="text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    Edit
                  </button>
                  {/* Delete button */}
                  <button
                    onClick={() => handleDeleteNote(index)}
                    className="text-red-600 hover:text-red-800 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-gray-600 mt-1">{savedNote}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OfficeNotes;
