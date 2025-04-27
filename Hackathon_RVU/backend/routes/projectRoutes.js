const express = require("express");
const projectController = require("../controllers/projectController");
const router = express.Router();

// Create Project
router.post("/", projectController.createProject); // Use relative path here

// Get All Projects
router.get("/", projectController.getAllProjects); // Use relative path here
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);
router.post("/:id/collaborators", projectController.addCollaborator);
router.post("/:id/comments", projectController.addComment);

module.exports = router;
