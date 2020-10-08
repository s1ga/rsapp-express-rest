const DB = require('../common/inMemoryDB');
const User = require('../models/user.model');

const dbUsers = DB.Users;

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return dbUsers;
};

const getById = async id => {
  try {
    const user = await dbUsers.filter(
      i => i.id.toString() === id.toString()
    )[0];

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (e) {
    console.log(e);
  }
};

const create = async body => {
  try {
    const user = User.fromRequest(body);
    await dbUsers.push(user);
    const dbUser = await getById(user.id);

    if (!dbUser) {
      throw new Error('User not created');
    }

    return dbUser;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getAll, getById, create };
