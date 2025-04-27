const Project = require("../models/Project");

// Create Project
exports.createProject = async (req, res) => {
  const { title, description, tags } = req.body;

  try {
    const newProject = new Project({
      title,
      description,
      tags,
    });

    await newProject.save();
    res.status(201).json(newProject); // Return the created project
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Projects
exports.getAllProjects = async (req, res) => {
try {
  const projects = await Project.find().populate(
    "collaborators",
    "username email"
  );
  // 👆 VERY IMPORTANT: populate collaborators and get username + email only

  res.status(200).json(projects);
} catch (error) {
  console.error("Error fetching projects:", error);
  res.status(500).json({ message: "Failed to fetch projects" });
}
};

// Update Project
exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, tags } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, tags },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// Delete Project by ID
exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// Add Collaborator to Project
const User = require("../models/User"); // Import User model

exports.addCollaborator = async (req, res) => {
  const { id } = req.params; // project id
  const { collaboratorId } = req.body; // user id to add

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ⚡ New: Check if user exists
    const user = await User.findById(collaboratorId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ⚡ Already a collaborator check
    if (project.collaborators.includes(collaboratorId)) {
      return res
        .status(400)
        .json({ message: "User is already a collaborator" });
    }

    project.collaborators.push(collaboratorId);
    await project.save();

    res.status(200).json({ message: "Collaborator added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add Comment to Project
exports.addComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body; // User's comment

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.comments.push({ comment, createdAt: new Date() });
    await project.save();

    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
