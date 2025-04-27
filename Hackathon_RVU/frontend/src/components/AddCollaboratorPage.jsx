import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // To get project ID from the URL
import "./AddCollaboratorPage.css";
const AddCollaboratorPage = () => {
  const { projectId } = useParams(); // Get project ID from URL params
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedUser, setSelectedUser] = useState(""); // Set default to empty string
  const [selectedProject, setSelectedProject] = useState(projectId || ""); // Default to projectId from URL or empty string
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // To display success message after adding collaborator
  const [loading, setLoading] = useState(true); // Loading state for fetching data

  // Fetch users and projects on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(
          "http://localhost:8000/api/users"
        );
        setUsers(usersResponse.data);

        const projectsResponse = await axios.get(
          "http://localhost:8000/api/projects"
        );
        setProjects(projectsResponse.data);
      } catch (error) {
        setError("Failed to load users or projects.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when data fetching is done
      }
    };

    fetchData();
  }, []);

  // Handle adding a collaborator
  const handleAddCollaborator = async () => {
    if (!selectedUser || !selectedProject) {
      setError("Please select both a user and a project.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8000/api/projects/${selectedProject}/collaborators`,
        { collaboratorId: selectedUser }
      );
      setError(""); // Clear error message on success
      setSuccessMessage("Collaborator added successfully!");

      // Reset user selection after success
      setSelectedUser("");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setError("Failed to add collaborator.");
      console.error("Error adding collaborator:", error);
    }
  };

  return (
    <div>
      <h3>Add Collaborator to Project</h3>

      {/* Display error or success messages */}
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}

      {/* Loading state */}
      {loading ? (
        <div>Loading projects and users...</div>
      ) : (
        <>
          {/* Dropdown for selecting a project */}
          <div>
            <label>Select Project:</label>
            <select
              onChange={(e) => setSelectedProject(e.target.value)}
              value={selectedProject}
              disabled={projects.length === 0} // Disable if no projects available
            >
              <option value="">Select a Project</option>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.title}
                  </option>
                ))
              ) : (
                <option disabled>No projects available</option>
              )}
            </select>
          </div>

          {/* Dropdown for selecting a user */}
          <div>
            <label>Select User:</label>
            <select
              onChange={(e) => setSelectedUser(e.target.value)}
              value={selectedUser}
              disabled={users.length === 0} // Disable if no users available
            >
              <option value="">Select a User</option>
              {users.length > 0 ? (
                users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}{" "}
                    {/* Assuming users have a 'username' field */}
                  </option>
                ))
              ) : (
                <option disabled>No users available</option>
              )}
            </select>
          </div>

          {/* Add Collaborator Button */}
          <button onClick={handleAddCollaborator}>Add Collaborator</button>
        </>
      )}
    </div>
  );
};

export default AddCollaboratorPage;
