const express = require('express');
const ProjectController = require('../controller/projectController');
const route = express.Router();

route
    .post('/', ProjectController.create)
    .delete('/:projectId', ProjectController.delete)
    .put('/', ProjectController.update)

module.exports = route;