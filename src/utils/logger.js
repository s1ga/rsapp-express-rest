const morgan = require('morgan');
// const { createWriteStream } = require('fs');
const path = require('path');
const winston = require('winston');

//
// const handler = (err, req, res, next) => {
//   console.error(err);

//   res.status(500).send('Internal server error');
//   next(err);
// };

const loggerFiles = {
  errorFile: {
    level: 'error',
    filename: path.resolve(__dirname, '../../', 'logs', 'errors.log'),
    json: true,
    maxFiles: 1,
    maxsize: 5242880
  },
  infoFile: {
    level: 'info',
    filename: path.resolve(__dirname, '../../', 'logs', 'logs.log'),
    json: true,
    maxFiles: 1,
    maxsize: 5242880
  },
  console: {
    json: true,
    colorize: true
  }
};

const logger = winston.createLogger({
  format: winston.format.printf(info => {
    const msg = info.message.split('\n')[0];
    return JSON.stringify(msg);
  }),
  transports: [
    new winston.transports.File(loggerFiles.infoFile),
    new winston.transports.File(loggerFiles.errorFile),
    new winston.transports.Console(loggerFiles.console)
  ],
  exitOnError: false
});

logger.stream = {
  write(msg) {
    logger.info(msg);
  }
};

process
  .on('uncaughtException', err => {
    logger.error(`Uncaught ${err.stack}`);
    // process.exit(1);
  })
  .on('unhandledRejection', promise => {
    logger.error(`Promise ${promise.stack}`);
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
    stream: logger.stream
  }
);
// createWriteStream(path.join(__dirname, '../../', 'logs', 'requests.log'), { flags: 'a' })

module.exports = { reqLogger, logger };
