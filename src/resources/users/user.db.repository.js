const User = require('./user.model');
// const taskService = require('../tasks/task.service');
const SERVER_ERROR = require('../../utils/errorsHandler');

const getAll = async () => {
  return User.find();
};

const getById = async id => {
  const user = await User.findById(id);

  if (!user) {
    throw new SERVER_ERROR({ status: 404, message: 'User not found' });
  }

  return user;
};

const create = async body => {
  const { name, login, password } = body;
  const user = new User({ name, login, password });

  if (!user) {
    throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
  }

  await user.save();
  return user;
};

const update = async (id, body) => {
  await User.findByIdAndUpdate(id, body);
  const user = await User.findById(id);

  if (!user) {
    throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
  }

  return user;
};

const deleteById = async id => {
  const user = await User.findById(id);

  if (!user) {
    throw new SERVER_ERROR({ status: 404, message: 'User not found' });
  }

  return await User.deleteOne({ _id: id });
};

module.exports = { getAll, getById, create, update, deleteById };
