const { JWT_SECRET_KEY } = require('../common/config');
const jwt = require('jsonwebtoken');
const SERVER_ERROR = require('../utils/errorsHandler');

module.exports = function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    throw new SERVER_ERROR({
      status: 401,
      message: 'Access token is missing or invalid'
    });
  }

  jwt.verify(token, JWT_SECRET_KEY, err => {
    if (err) {
      throw new SERVER_ERROR({
        status: 403,
        message: 'Access token is missing or invalid'
      });
    } else {
      return next();
    }
  });
};
