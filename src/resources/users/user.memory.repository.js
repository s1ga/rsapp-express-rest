const DB = require('../../common/inMemoryDB');
const User = require('./user.model');
const taskService = require('../tasks/task.service');
const dbUsers = DB.Users;
const { logger } = require('../../utils/logger');

const getAll = async () => {
  try {
    // throw new Error('Error from getAllUsers');
    return dbUsers;
  } catch (e) {
    logger.log(e);
  }
};

const getById = async id => {
  try {
    const user = dbUsers.filter(i => i.id.toString() === id.toString())[0];
    // throw new Error('Error from userID');
    return user;
  } catch (e) {
    console.log(e.message);
    logger.error(e);
  }
};

const create = async body => {
  try {
    const user = User.fromRequest(body);
    dbUsers.push(user);
    const dbUser = await getById(user.id);

    return dbUser;
  } catch (e) {
    logger.error(e);
    console.log(e.message);
  }
};

const update = async (id, body) => {
  try {
    const user = await getById(id);

    if (!user) {
      return null;
    }

    for (const [key, value] of Object.entries(body)) {
      user[key] = value;
    }
    dbUsers[id.toString()] = user;

    return user;
  } catch (e) {
    logger.error(e);
    console.log(e.message);
  }
};

const deleteById = async id => {
  try {
    const user = await getById(id);
    const index = dbUsers.indexOf(user);

    if (index < 0) {
      throw new Error('User not found');
    }

    // logic of setting userId = null in Tasks
    await taskService.nullUserTasks(user.id);

    dbUsers.splice(index, 1);
    return true;
  } catch (e) {
    logger.error(e);
    console.log(e.message);
  }
};

module.exports = { getAll, getById, create, update, deleteById };
