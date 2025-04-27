import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // To get project ID from the URL

const AddCommentPage = () => {
  const { projectId } = useParams(); // Get the project ID from the URL if provided
  const [comment, setComment] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(projectId || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all projects for the dropdown list
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleAddComment = async (e) => {
    e.preventDefault();

    // Ensure a project is selected
    if (!selectedProjectId) {
      setError("Please select a project.");
      return;
    }

    try {
      // Send comment to backend
      await axios.post(
        `http://localhost:8000/api/projects/${selectedProjectId}/comments`,
        { comment }
      );
      setSuccess("Comment added successfully!");
      setError(""); // Clear any previous error messages
      setComment(""); // Clear comment input
    } catch (error) {
      setError("Failed to add comment.");
      console.error("Error adding comment:", error);
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedProjectId(e.target.value);
  };

  return (
    <div>
      <h3>Add Comment to Project</h3>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleAddComment}>
        {/* Dropdown for selecting project */}
        <select
          onChange={handleDropdownChange}
          value={selectedProjectId}
          required
        >
          <option value="" disabled>
            Select a project
          </option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.title}
            </option>
          ))}
        </select>

        {/* Text input for comment */}
        <input
          type="text"
          placeholder="Your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default AddCommentPage;
