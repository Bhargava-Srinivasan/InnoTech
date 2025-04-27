const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController"); // Fixed the path

// Route to get all other users (except logged-in user)
router.get("/others/:currentUserId", userController.getOtherUsers);

// Route to follow another user
router.post("/follow", userController.followUser);

module.exports = router;
