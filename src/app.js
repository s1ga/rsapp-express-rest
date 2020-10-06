// requiring dependencies
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

// require routes
const userRouter = require('./routes/user.router');

// create express app
const app = express();

// swagger api
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

// using json
app.use(express.json());

// using swagger doc
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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

module.exports = app;
