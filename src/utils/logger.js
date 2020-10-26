const morgan = require('morgan');
const path = require('path');
const winston = require('winston');
const serverError = require('./errorsHandler');

// custom level for morgan requests
const customLevel = {
  levels: {
    requests: 8
  }
};

// options for file and console writing
const loggerFiles = {
  errorFile: {
    level: 'error',
    filename: path.resolve(__dirname, '../../', 'logs', 'errors.log'),
    handleExceptions: true,
    handleRejections: true,
    json: true,
    maxFiles: 5,
    maxsize: 5242880
  },
  infoFile: {
    level: 'info',
    filename: path.resolve(__dirname, '../../', 'logs', 'info.log'),
    handleExceptions: true,
    handleRejections: true,
    json: true,
    maxFiles: 5,
    maxsize: 5242880
  },
  reqFile: {
    level: 'requests',
    filename: path.resolve(__dirname, '../../', 'logs', 'requests.log'),
    json: true,
    maxFiles: 5,
    maxsize: 5242880
  },
  console: {
    handleExceptions: true,
    handleRejections: true,
    colorize: true
  }
};

const customLogger = winston.createLogger({
  levels: customLevel.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => {
      const ts = info.timestamp.slice(0, 19).replace('T', ' ');
      const msg = info.message;
      return `${ts} +0000 — ${msg}`;
    })
  ),
  transports: [new winston.transports.File(loggerFiles.reqFile)],
  exitOnError: true
});

// create winston logger
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => {
      const ts = info.timestamp.slice(0, 19).replace('T', ' ');
      const msg = info.message;
      return `${ts} +0000 — ${msg}`;
    })
  ),
  transports: [
    new winston.transports.File(loggerFiles.infoFile),
    new winston.transports.File(loggerFiles.errorFile),
    new winston.transports.Console(loggerFiles.console)
  ],
  exceptionHandlers: [new winston.transports.File(loggerFiles.errorFile)],
  exitOnError: true
});

// winston logger stream for morgan
logger.stream = {
  write(msg) {
    logger.info(msg);
    customLogger.requests(msg);
  }
};

// morgan tokens
morgan.token('body', req => {
  let body = req.body;
  if (body.password) {
    body = { ...body, password: '*'.repeat(body.password.length) };
  }
  return JSON.stringify(body);
});
morgan.token('query', req => JSON.stringify(req.query));

// morgan requests logging
const reqLogger = morgan(
  ':date[clf] :method :status :url — QUERY::query — BODY::body :response-time ms',
  {
    stream: logger.stream
  }
);

// uncaught and promise errors
// process
//   .on('uncaughtException', err => {
//     logger.error(`Uncaught ${err.stack}`);
//     process.exitCode = 1;
//   })
//   .on('unhandledRejection', promise => {
//     logger.error(`Promise ${promise.stack}`);
//   });

// server errors
const handler = (err, req, res, next) => {
  logger.error(err.message);
  if (err instanceof serverError) {
    res.status(err.serverStatus).send(err.message);
  } else {
    logger.log('error', `500 Error: ${err.message}`);
    res.status(500).send('Internal server error');
  }
  next();
};

module.exports = { reqLogger, logger, handler };
