const morgan = require('morgan');
const { createWriteStream } = require('fs');
const path = require('path');
const winston = require('winston');

//
// const handler = (err, req, res, next) => {
//   console.error(err);

//   res.status(500).send('Internal server error');
//   next(err);
// };

const unHandlerFile = {
  file: {
    level: 'error',
    filename: path.resolve(__dirname, '../../', 'logs', 'unHandler.log'),
    json: true,
    maxFiles: 1,
    maxsize: 5242880
  },

  console: {
    level: 'error',
    json: true,
    colorize: true
  }
};

const logger = winston.createLogger({
  format: winston.format.printf(info => {
    const msg = { Error: info.message.split('\n')[0] };
    return JSON.stringify(msg);
  }),
  transports: [
    new winston.transports.File(unHandlerFile.file),
    new winston.transports.Console(unHandlerFile.console)
  ],
  //   rejectionHandlers: [
  //     new winston.transports.File(unHandlerFile.file),
  //     new winston.transports.Console(unHandlerFile.console)
  //   ],
  //   exceptionHandlers: [
  //     new winston.transports.File(unHandlerFile.file),
  //     new winston.transports.Console(unHandlerFile.console)
  //   ],
  exitOnError: false
});

process
  .on('uncaughtException', err => {
    logger.error(err);
    // process.exit(1);
  })
  .on('unhandledRejection', promise => {
    logger.error(promise);
    // process.exit(1);
  });

// requests logging
morgan.token('body', req => {
  let body = req.body;
  if (body.password) {
    body = { ...body, password: '*'.repeat(body.password.length) };
  }
  return JSON.stringify(body);
});
morgan.token('query', req => JSON.stringify(req.query));

const reqLogger = morgan(
  ':date[clf] :method :status :url — QUERY::query — BODY::body :response-time ms',
  {
    stream: createWriteStream(
      path.join(__dirname, '../../', 'logs', 'requests.log'),
      { flags: 'a' }
    )
  }
);

module.exports = { reqLogger /* errHandler*/ };
