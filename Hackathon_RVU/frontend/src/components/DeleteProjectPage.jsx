import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the list of projects when the component mounts
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/projects");
        setProjects(response.data);
      } catch (error) {
        setError("Failed to load projects.");
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`http://localhost:8000/api/projects/${projectId}`);
      setProjects(projects.filter((project) => project._id !== projectId)); // Use _id instead of id
    } catch (error) {
      setError("Failed to delete project.");
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h3>Delete Project</h3>
      {error && <div style={styles.error}>{error}</div>}
      <ul style={styles.projectList}>
        {projects.map((project) => (
          <li key={project._id} style={styles.projectItem}>
            <h4>{project.title}</h4>
            <button
              style={styles.deleteButton}
              onClick={() => handleDelete(project._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Some basic inline CSS styling
const styles = {
  container: {
    width: "500px",
    margin: "30px auto",
    padding: "20px",
    border: "2px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  projectList: {
    listStyle: "none",
    padding: 0,
  },
  projectItem: {
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#fff",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default DeleteProjectPage;
