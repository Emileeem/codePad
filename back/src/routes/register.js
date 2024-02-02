const express = require("express");
const RegisterController = require("../controller/registerController");
const route = express.Router();

route
    .post("/", RegisterController.register);

module.exports = route;
