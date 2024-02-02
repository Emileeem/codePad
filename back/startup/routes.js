const express = require('express');
const project = require('../src/routes/project');
const user = require('../src/routes/user')
const register = require('../src/routes/register')

module.exports = function(app) {
    app
    .use(express.json())
    .use('/api/project', project)
    .use('/api/user', user)
    .use('/api/register', register)
}