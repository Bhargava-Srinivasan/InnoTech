import React, { useState } from "react";
import axios from "axios";

const CreateProject = () => {
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/projects", {
        title: newProjectTitle,
        description: newProjectDescription,
      });

      // Clear the input fields after successful project creation
      setNewProjectTitle("");
      setNewProjectDescription("");

      // Set success message
      setSuccess("Project created successfully!");
      setError("");
    } catch (error) {
      // Log full error for debugging
      console.error("Error creating project:", error);
      // Set error message based on axios error response
      setError(
        error.response
          ? error.response.data.message
          : "Failed to create project"
      );
      setSuccess("");
    }
  };

  return (
    <div>
      <h3>Create New Project</h3>

      {/* Display success or error messages */}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleCreateProject}>
        <input
          type="text"
          placeholder="Project Title"
          value={newProjectTitle}
          onChange={(e) => setNewProjectTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Project Description"
          value={newProjectDescription}
          onChange={(e) => setNewProjectDescription(e.target.value)}
          required
        />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
