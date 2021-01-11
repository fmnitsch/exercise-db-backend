const express = require('express');
const apiRouter = express.Router();
const exercisesRouter = require('./exercises');

apiRouter.use('/exercises', exercisesRouter);

module.exports = apiRouter;