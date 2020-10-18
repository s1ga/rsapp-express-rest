const DB = require('../../common/inMemoryDB');
const User = require('./user.model');
const taskService = require('../tasks/task.service');
const dbUsers = DB.Users;
const { logger } = require('../../utils/logger');

const getAll = async () => {
  try {
    return dbUsers;
  } catch (e) {
    logger.log('error', e.stack);
  }
};

const getById = async id => {
  try {
    const user = dbUsers.filter(i => i.id.toString() === id.toString())[0];
    // throw new Error('Error from userID');
    return user;
  } catch (e) {
    logger.log('error', e.stack);
  }
};

const create = async body => {
  try {
    const user = User.fromRequest(body);
    dbUsers.push(user);
    const dbUser = await getById(user.id);

    return dbUser;
  } catch (e) {
    logger.log('error', e.stack);
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
    logger.log('error', e.stack);
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
    logger.log('error', e.stack);
  }
};

module.exports = { getAll, getById, create, update, deleteById };
