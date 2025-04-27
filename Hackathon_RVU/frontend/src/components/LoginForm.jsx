import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./LoginPage.css"; // Import the external CSS

const LoginForm = ({ isSignup }) => {
  const [username, setUsername] = useState(""); // Only needed for Signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // To show response messages (success/error)
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API endpoint to be used for login/signup
      const url = isSignup
        ? "http://localhost:8000/api/auth/register" // Signup endpoint
        : "http://localhost:8000/api/auth/login"; // Login endpoint

      const body = isSignup
        ? { username, email, password } // Include username for signup
        : { email, password }; // Only email and password for login

      // Make the API request to the backend
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // Send form data
      });

      const data = await response.json(); // Get response data

      if (response.ok) {
        setMessage(
          isSignup ? "Account created successfully!" : "Login successful!"
        );
        console.log(isSignup ? "Signup successful" : "Login successful", data);

        // Redirect to the dashboard after successful login/signup
        navigate("/dashboard"); // Redirect to the dashboard page
      } else {
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during request:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>{isSignup ? "Create Account" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              className="input-field"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="submit-button">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
