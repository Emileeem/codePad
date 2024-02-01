const express = require('express');
const UserController = require('../controller/userController');
const route = express.Router();

route
    .post('/', UserController.create)

module.exports = route;