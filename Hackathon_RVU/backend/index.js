const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const cors = require("cors");
app.use(cors());

// Importing routes (Make sure these paths are correct)
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const userRoutes = require('./routes/userRoutes'); // Adjust the path if needed

// Importing User model
const User = require("./models/User"); // Adjust the path to where your User model is located

// Middleware
app.use(express.json()); // To parse incoming JSON requests

// Connect to MongoDB using the connection string from .env
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Use routes
app.use("/api/auth", authRoutes); // Ensure this matches your route handling for authentication
app.use("/api/projects", projectRoutes); // Ensure this matches your route handling for projects
app.use("/api/users", userRoutes);
// Example route to get users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // Assuming User is a mongoose model
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err); // Log the error
    res.status(500).json({ message: "Failed to fetch users", error: err });
  }
});

// Start the server on the port from .env
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
