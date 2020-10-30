const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../users/user.model');
const { logger } = require('../../utils/logger');
const { JWT_SECRET_KEY } = require('../../common/config');

const findUser = async (login, password) => {
  try {
    const candidate = await User.findOne({ login });
    if (!candidate) {
      return null;
    }

    const areSame = await bcrypt.compare(password, candidate.password);
    if (!areSame) {
      return null;
    }
    return candidate;
  } catch (e) {
    logger.error(e);
  }
};

const getToken = user => {
  try {
    const { id, login } = user;
    const token = jwt.sign({ id, login }, JWT_SECRET_KEY, {
      expiresIn: '10min'
    });

    return token;
  } catch (e) {
    logger.error(e);
  }
};

module.exports = { findUser, getToken };
