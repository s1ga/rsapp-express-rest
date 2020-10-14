const morgan = require('morgan');
const { createWriteStream } = require('fs');
const path = require('path');

morgan.token('body', req => JSON.stringify(req.body));
morgan.token('query', req => JSON.stringify(req.query));

const reqLogger = morgan('URL::url QUERY::query BODY::body', {
  stream: createWriteStream(
    path.join(__dirname, '../../', 'logs', 'requests.log'),
    { flags: 'a' }
  )
});

const handler = (err, req, res, next) => {
  console.error(err);

  res.status(500).send('Internal server error');
  next();
};

module.exports = { reqLogger, handler };
