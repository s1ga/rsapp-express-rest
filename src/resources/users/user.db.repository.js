const User = require('./user.model');
const taskService = require('../tasks/task.service');

const getAll = () => {
  return User.find();
};

const getById = id => {
  return User.findById(id);
};

const create = body => {
  const { name, login, password } = body;
  return User.create({ name, login, password });
};

const update = (id, body) => {
  const { name, login, password } = body;
  return User.findByIdAndUpdate(id, { name, login, password }, { new: true });
};

const deleteById = id => {
  taskService.nullUserTasks(id);
  return User.findByIdAndDelete(id);
};

module.exports = { getAll, getById, create, update, deleteById };
