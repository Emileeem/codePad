const express = require('express');
const ProjectController = require('../controller/projectController');
const route = express.Router();

route
    .post('/', ProjectController.create)

module.exports = route;