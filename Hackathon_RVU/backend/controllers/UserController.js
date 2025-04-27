// backend/controllers/userController.js
const User = require("../models/User");

// Controller function to get all other users except the logged-in user
const mongoose = require("mongoose");

exports.getOtherUsers = async (req, res) => {
  try {
    const { currentUserId } = req.params;

    // Check if currentUserId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(currentUserId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const users = await User.find({ _id: { $ne: currentUserId } }).select(
      "-password"
    );
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Controller function to handle following a user
exports.followUser = async (req, res) => {
  try {
    const { currentUserId, targetUserId } = req.body;

    // Update current user's following list
    await User.findByIdAndUpdate(currentUserId, {
      $addToSet: { following: targetUserId },
    });

    // Update target user's followers list
    await User.findByIdAndUpdate(targetUserId, {
      $addToSet: { followers: currentUserId },
    });

    res.json({ message: "Followed successfully!" });
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Failed to follow user" });
  }
};
