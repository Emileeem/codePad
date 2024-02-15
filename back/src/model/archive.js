const mongoose = require("mongoose");
const ArchiveSchema =   new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    minlength: 3,
  },
  content: {
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

