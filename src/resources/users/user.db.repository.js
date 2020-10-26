const User = require('./user.model');
const taskService = require('../tasks/task.service');

const getAll = () => {
  return User.find();
};

const getById = id => {
  return User.findById(id);
};

const create = body => {
  return User.create(body);
};

const update = (id, body) => {
  return User.findByIdAndUpdate(id, body, { new: true });
};

const deleteById = id => {
  taskService.nullUserTasks(id);
  return User.findByIdAndDelete(id);
};

module.exports = { getAll, getById, create, update, deleteById };
