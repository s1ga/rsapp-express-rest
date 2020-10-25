const Board = require('./board.model');
const taskService = require('../tasks/task.service');

const getAll = async () => {
  return Board.find();
};

const getById = async id => {
  return Board.findById(id);
};

const create = async body => {
  const { title, columns } = body;
  return Board.create({ title, columns });
};

const update = async (id, body) => {
  const { title, columns } = body;
  return Board.findByIdAndUpdate(id, { title, columns }, { new: true });
};

const deleteById = async id => {
  // there should be a logic of deleting a Tasks
  taskService.deleteByBoardId(id);
  return Board.findByIdAndDelete(id);
};

module.exports = { getAll, getById, create, update, deleteById };
