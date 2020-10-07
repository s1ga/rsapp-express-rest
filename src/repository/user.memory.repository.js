const User = require('../models/user.model');

const dbUsers = [new User(), new User()];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return dbUsers;
};

const getById = async id => {
  try {
    const user = await dbUsers.filter(
      i => i.id.toString() === id.toString()
    )[0];

    return user;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getAll, getById };
