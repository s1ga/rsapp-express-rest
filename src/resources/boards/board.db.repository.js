const Board = require('./board.model');
const taskService = require('../tasks/task.service');

const getAll = () => {
  return Board.find();
};

const getById = id => {
  return Board.findById(id);
};

const create = body => {
  const { title, columns } = body;
  return Board.create({ title, columns });
};

const update = (id, body) => {
  const { title, columns } = body;
  return Board.findByIdAndUpdate(id, { title, columns }, { new: true });
};

const deleteById = id => {
  // there should be a logic of deleting a Tasks
  taskService.deleteByBoardId(id);
  return Board.findByIdAndDelete(id);
};

module.exports = { getAll, getById, create, update, deleteById };
