const express = require("express");
const ArchiveController = require("../controller/archiveController");

const route = express.Router();

route
    .post("/", ArchiveController.create)
    .delete("/:archiveId", ArchiveController.delete)
    .put("/:archiveId", ArchiveController.update)
module.exports = route;
