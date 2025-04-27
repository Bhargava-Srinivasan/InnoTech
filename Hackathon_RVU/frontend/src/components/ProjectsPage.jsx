import React from "react";
import { Link } from "react-router-dom";
import "./ProjectsPage.css"; 
const ProjectsPage = () => {
  return (
    <div className="projects-page">
      <h2>Manage Your Projects</h2>

      <div className="buttons-container">
        <Link to="/create-project">
          <button>Create Project</button>
        </Link>
        <Link to="/list-projects">
          <button>List All Projects</button>
        </Link>
        <Link to="/delete-project">
          <button>Delete Project</button>
        </Link>
        <Link to="/add-collaborator">
          <button>Add Collaborator</button>
        </Link>
        <Link to="/add-comment">
          <button>Add Comment</button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectsPage;
