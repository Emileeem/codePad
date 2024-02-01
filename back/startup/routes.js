const express = require('express');
const project = require('../src/routes/project');
const user = require('../src/routes/user')

module.exports = function(app) {
    app
    .use(express.json())
    .use('/api/project', project)
    .use('/api/user', user)
}