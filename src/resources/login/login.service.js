const bcrypt = require('bcrypt');
const User = require('../users/user.model');
const { logger } = require('../../utils/logger');

const findUser = async (login, password) => {
  try {
    const candidate = await User.findOne({ login });
    if (!candidate) {
      return null;
    }

    const isSame = await bcrypt.compare(password, candidate.password);
    if (!isSame) {
      return null;
    }
    return candidate;
  } catch (e) {
    logger.error(e);
  }
};

module.exports = { findUser };
