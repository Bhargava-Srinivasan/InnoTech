// src/components/DashboardPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css"; // Optional: Add styles for dashboard page

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <h2>Welcome to Your Dashboard</h2>
      <p>Navigate through the sections below:</p>
      <ul>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
       
        <li>
          <Link to="/connect">Connect to People</Link>
        </li>
        <li>
          <Link to="/qna">QnA</Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardPage;
