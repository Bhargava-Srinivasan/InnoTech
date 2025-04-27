import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar"; // Import Navbar
import DashboardPage from "./components/DashboardPage";
import ProjectsPage from "./components/ProjectsPage";
import ListProjectsPage from "./components/ListProjectsPage"; // New page for listing projects
import CreateProject from "./components/CreateProject"; // New page for creating projects
import DeleteProjectPage from "./components/DeleteProjectPage"; // New page for deleting projects
import AddCollaboratorPage from "./components/AddCollaboratorPage"; // New page for adding collaborators
import AddCommentPage from "./components/AddCommentPage"; // New page for adding comments
import ConnectPage from "./components/ConnectPage";

const App = () => {
  return (
    <Router>
      {/* Navbar for consistent navigation */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/list-projects" element={<ListProjectsPage />} />
        <Route path="/create-project" element={<CreateProject />} />{" "}
        {/* Route for creating a project */}
        <Route path="/delete-project" element={<DeleteProjectPage />} />{" "}
        {/* Route for deleting a project */}
        <Route
          path="/add-collaborator"
          element={<AddCollaboratorPage />}
        />{" "}
        {/* Route for adding collaborator */}
        <Route path="/add-comment" element={<AddCommentPage />} />{" "}
        {/* Route for adding a comment */}
        <Route path="/connect" element={<ConnectPage />} />
      </Routes>
    </Router>
  );
};

export default App;
