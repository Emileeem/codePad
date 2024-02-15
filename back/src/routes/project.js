const express = require('express');
const ProjectController = require('../controller/projectController');
const route = express.Router();

route
    .post('/', ProjectController.create)
    .delete('/:projectId', ProjectController.delete)
    .put('/', ProjectController.update)
    .get('/:projectid/files', ProjectController.getFileNames)
    .get('/:projectid/files/*', ProjectController.getFile)

module.exports = route;