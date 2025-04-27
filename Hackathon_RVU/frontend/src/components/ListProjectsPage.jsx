import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListProjectsPage.css"; // Import the CSS file for styling

const ListProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the list of projects when the component mounts
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/projects");
        console.log("Projects data:", response.data);
        setProjects(response.data); // Response should have populated collaborators
        setLoading(false);
      } catch (error) {
        setError("Failed to load projects");
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="projects-container">
      <h3>List of Projects</h3>

      {loading && <div>Loading projects...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <div className="project-list">
          {projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            projects.map((project) => (
              <div key={project._id} className="project-card">
                <h4>{project.title}</h4>
                <p>{project.description}</p>

                {/* Collaborators */}
                <div className="collaborators">
                  <h5>Collaborators:</h5>
                  {!project.collaborators ||
                  project.collaborators.length === 0 ? (
                    <p>No collaborators assigned to this project.</p>
                  ) : (
                    <ul>
                      {project.collaborators.map((collaborator) => (
                        <li key={collaborator._id}>
                          {/* Safely check if collaborator is populated */}
                          {collaborator.username ? (
                            <>
                              <strong>{collaborator.username}</strong> (
                              {collaborator.email})
                            </>
                          ) : (
                            <span>Unknown collaborator</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Comments */}
                <div className="comments">
                  <h5>Comments:</h5>
                  {!project.comments || project.comments.length === 0 ? (
                    <p>No comments yet.</p>
                  ) : (
                    <ul>
                      {project.comments.map((comment, index) => (
                        <li key={index}>{comment.comment}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ListProjectsPage;
