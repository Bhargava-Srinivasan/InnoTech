const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  collaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // <-- Tell Mongoose these are references to User model
    },
  ],
  comments: [
    {
      comment: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Project", projectSchema);
