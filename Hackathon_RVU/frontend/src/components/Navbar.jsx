import React from "react";
import "./HomePage.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        EduConnect
      </a>
      <div className="navbar-links">
          
      </div>
      <button
        className="login-button"
        onClick={() => (window.location.href = "/landing")}
      >
        Login
      </button>
    </nav>
  );
};

export default Navbar;
