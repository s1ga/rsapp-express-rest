const User = require('../models/user.model');

const dbUsers = [new User(), new User()];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return dbUsers;
};

const getById = async id => {
  const user = await dbUsers.filter(i => i.id.toString() === id.toString());

  if (!user) {
    return null;
  }

  return user;
};

module.exports = { getAll, getById };
