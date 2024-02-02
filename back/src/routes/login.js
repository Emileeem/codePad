const express = require("express");
const LoginController = require("../controller/loginController");

const route = express.Router();

route
    .post("/", LoginController.login);

module.exports = route;
