const mongoose = require("mongoose");
const {PathSchema} = require("./path")
const Archive = mongoose.model(
  "Archive",
  new mongoose.Schema({
    isArchive: {
      type: Boolean,
      required: true,
    },
    path: {
      type: String,
      required: true,
      minlength: 3,
    },
    archives: {
        type: [PathSchema],
        required: false,
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

module.exports = Archive;
