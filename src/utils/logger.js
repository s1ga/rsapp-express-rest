const morgan = require('morgan');
const { createWriteStream } = require('fs');
const path = require('path');
const winston = require('winston');

// requests logging
morgan.token('body', req => JSON.stringify(req.body));
morgan.token('query', req => JSON.stringify(req.query));
const reqLogger = morgan('URL::url — QUERY::query — BODY::body', {
  stream: createWriteStream(
    path.join(__dirname, '../../', 'logs', 'requests.log'),
    { flags: 'a' }
  )
});

// unhandled errors
const handler = (err, req, res, next) => {
  console.error(err);

  res.status(500).send('Internal server error');
  next();
};

const logger = winston.createLogger({
  format: winston.format.printf(info => {
    const msg = { Error: info.message.split('\n')[0] };
    return JSON.stringify(msg);
  }),
  rejectionHandlers: [
    new winston.transports.File({
      level: 'error',
      filename: path.resolve(__dirname, '../../', 'logs', 'unHandler.log')
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({
      level: 'error',
      filename: path.resolve(__dirname, '../../', 'logs', 'unHandler.log')
    })
  ],
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: path.resolve(__dirname, '../../', 'logs', 'errors.log')
    })
  ],
  exitOnError: false
});

module.exports = { reqLogger, handler, /* errHandler*/ logger };
