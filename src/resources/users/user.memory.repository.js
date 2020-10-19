const DB = require('../../common/inMemoryDB');
const User = require('./user.model');
const taskService = require('../tasks/task.service');
const dbUsers = DB.Users;
const SERVER_ERROR = require('../../utils/errorsHandler');

const getAll = async () => {
  return dbUsers;
};

const getById = async id => {
  const user = dbUsers.filter(i => i.id.toString() === id.toString())[0];
  if (!user) {
    throw new SERVER_ERROR({ status: 404, message: 'User not found' });
  }
  return user;
};

const create = async body => {
  const user = User.fromRequest(body);
  dbUsers.push(user);
  const dbUser = dbUsers.filter(i => i.id === user.id)[0];

  if (!dbUser) {
    throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
  }

  return dbUser;
};

const update = async (id, body) => {
  const user = dbUsers.filter(i => i.id === id)[0];
  if (!user) {
    throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
  }

  console.log(user);
  for (const [key, value] of Object.entries(body)) {
    user[key] = value;
  }
  dbUsers[id.toString()] = user;

  return user;
};

const deleteById = async id => {
  const user = await getById(id);
  const index = dbUsers.indexOf(user);

  // logic of setting userId = null in Tasks
  await taskService.nullUserTasks(user.id);

  dbUsers.splice(index, 1);
  return true;
};

module.exports = { getAll, getById, create, update, deleteById };
