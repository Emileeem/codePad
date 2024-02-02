const express = require("express");
const AuthController = require("../controller/registerController");
const route = express.Router();

route
    .post("/", AuthController.register);

module.exports = route;
