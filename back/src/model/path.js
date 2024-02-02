const mongoose = require("mongoose");

const PathSchema = new mongoose.Schema({
    text: {
        type: String,
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

const Path = mongoose.model("Path", PathSchema);

exports.Path = Path;
exports.PathSchema = PathSchema;