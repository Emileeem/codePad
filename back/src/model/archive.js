const mongoose = require("mongoose");
const { userSchema } = require("./user");
const ArchiveSchema =   new mongoose.Schema({
  user: {
    type: userSchema,
    required: true
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  text: {
    type: String,
    required: false
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
const Archive = mongoose.model(
  "Archive",
  ArchiveSchema
);

exports.Archive = Archive;
exports.ArchiveSchema = ArchiveSchema;

