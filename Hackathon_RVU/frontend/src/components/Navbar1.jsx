// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Optional: Add styles for navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>{" "}
        {/* Link to the Dashboard */}
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/collaborate">Collaborate</Link>
        </li>
        <li>
          <Link to="/connect">Connect to People</Link>
        </li>
        <li>
          <Link to="/qna">QnA</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
