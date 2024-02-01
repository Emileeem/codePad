const mongoose = require("mongoose");
const { userSchema } = require("./user");

const Project = mongoose.model(
  "Project",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 4,
    },
    description: {
      type: String,
      required: false,
    },
    user: {
      type: userSchema,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: false,
    },
    removedAt: {
      type: Date,
      required: false,
    },
  })
);
module.exports = Project;
