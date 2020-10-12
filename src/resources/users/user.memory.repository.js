const DB = require('../../common/inMemoryDB');
const User = require('./user.model');
const taskService = require('../tasks/task.service');
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

const update = async (id, body) => {
  try {
    const user = await getById(id);
    for (const [key, value] of Object.entries(body)) {
      user[key] = value;
    }

    if (!user) {
      throw new Error('User not found');
    }
    dbUsers[id.toString()] = user;

    return user;
  } catch (e) {
    console.log(e);
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
    console.log(e);
  }
};

module.exports = { getAll, getById, create, update, deleteById };