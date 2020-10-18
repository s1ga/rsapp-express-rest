// requiring dependencies
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { reqLogger } = require('./utils/logger');

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

app.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
  next(err);
});

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

module.exports = app;

/*
  1. Доработка логов(правильная работа в разных кусках кода)
  2. Обработка ошибок сервера(расширение класса ошибок как вариант)
  3. Вместо console.log вставить logger()
*/
