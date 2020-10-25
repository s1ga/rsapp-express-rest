const User = require('./user.model');
const taskService = require('../tasks/task.service');

const getAll = async () => {
  return User.find();
};

const getById = async id => {
  return User.findById(id);
};

const create = async body => {
  const { name, login, password } = body;
  return User.create({ name, login, password });
};

const update = async (id, body) => {
  const { name, login, password } = body;
  return User.findByIdAndUpdate(id, { name, login, password }, { new: true });
};

const deleteById = async id => {
  taskService.nullUserTasks(id);
  return User.findByIdAndDelete(id);
};

module.exports = { getAll, getById, create, update, deleteById };
