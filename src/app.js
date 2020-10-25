// requiring dependencies
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const helmet = require('helmet');
const { reqLogger, handler } = require('./utils/logger');

// require routes
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

// create express app
const app = express();

// swagger api
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

// using json
app.use(express.json());

// using helmet
app.use(helmet());

// using swagger doc
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// req logger
app.use(reqLogger);

// base url path
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

// using routes
app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardid/tasks', taskRouter);

// unhandler errors
app.use(handler);

module.exports = app;

/*
  1. _id to id on columns
  2. check validation in boards
  3. mongoose errors
  4. clean code
*/
