const express = require('express');
const tasksRouter = require('./src/routes/tasks');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
app.use(express.json());
app.use('/tasks', tasksRouter);
app.use(errorHandler);

module.exports = app;
