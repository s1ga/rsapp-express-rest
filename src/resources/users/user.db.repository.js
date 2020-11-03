const User = require('./user.model');
const taskService = require('../tasks/task.service');
const bcrypt = require('bcrypt');
const { DEFAULT_SALT_ROUNDS } = require('../../common/config');

const getAll = () => {
  return User.find();
};

const getById = id => {
  return User.findById(id);
};

const create = async body => {
  const { name, login } = body;
  let { password } = body;
  const salt = await bcrypt.genSalt(DEFAULT_SALT_ROUNDS);
  password = await bcrypt.hash(password, salt);
  return User.create({ name, login, password });
};

const update = async (id, body) => {
  const { name, login } = body;
  let { password } = body;
  const salt = await bcrypt.genSalt(DEFAULT_SALT_ROUNDS);
  password = await bcrypt.hash(password, salt);
  return User.findByIdAndUpdate(id, { name, login, password }, { new: true });
};

const deleteById = id => {
  taskService.nullUserTasks(id);
  return User.findByIdAndDelete(id);
};

module.exports = { getAll, getById, create, update, deleteById };
