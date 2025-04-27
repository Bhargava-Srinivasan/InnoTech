import React, { useState, useEffect } from "react";
import axios from "axios";
import "./connectPage.css"; // Import CSS

const ConnectPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [followingUsers, setFollowingUsers] = useState([]); // Track followed users
  const currentUserId = "680da2e2da766deeab061c94"; // Replace with the logged-in user's ID dynamically

  useEffect(() => {
    // Fetch the users except the logged-in user
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/others/${currentUserId}`
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setError(
            `Error: ${error.response.status} - ${error.response.data.message}`
          );
        } else if (error.request) {
          setError("Error: No response from server.");
        } else {
          setError(`Error: ${error.message}`);
        }
        setLoading(false);
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentUserId]);

  const handleFollow = async (targetUserId) => {
    try {
      await axios.post("http://localhost:8000/api/users/follow", {
        currentUserId,
        targetUserId,
      });
      // After successful follow, update the followed users state
      setFollowingUsers((prev) => [...prev, targetUserId]);
    } catch (error) {
      if (error.response) {
        setError(
          `Error: ${error.response.status} - ${error.response.data.message}`
        );
      } else if (error.request) {
        setError("Error: No response from server.");
      } else {
        setError(`Error: ${error.message}`);
      }
      console.error("Error following user:", error);
    }
  };

  return (
    <div className="connect-page">
      <h2>Connect with People</h2>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="users-list">
          {users.length === 0 ? (
            <p>No users available to connect with.</p>
          ) : (
            users.map((user) => (
              <div key={user._id} className="user-card">
                <h3>{user.username}</h3>
                <button
                  onClick={() => handleFollow(user._id)}
                  disabled={followingUsers.includes(user._id)} // Disable if already followed
                >
                  {followingUsers.includes(user._id) ? "Following" : "Follow"}
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectPage;
