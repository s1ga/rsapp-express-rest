const Board = require('./board.model');
const SERVER_ERROR = require('../../utils/errorsHandler');
const taskService = require('../tasks/task.service');

const getAll = async () => {
  return Board.find();
};

const getById = async id => {
  const board = await Board.findById(id);

  if (!board) {
    throw new SERVER_ERROR({ status: 404, message: 'Board not found' });
  }

  return board;
};

const create = async body => {
  const { title, columns } = body;
  const board = new Board({ title, columns });

  if (!board) {
    throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
  }

  await board.save();
  return board;
};

const update = async (id, body) => {
  await Board.findByIdAndUpdate(id, body);
  const board = await Board.findById(id);

  if (!board) {
    throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
  }

  return board;
};

const deleteById = async id => {
  const board = await Board.findById(id);

  if (!board) {
    throw new SERVER_ERROR({ status: 404, message: 'Board not found' });
  }

  // there should be a logic of deleting a Task
  await taskService.deleteByBoardId(board.id);

  return board.remove();
};

module.exports = { getAll, getById, create, update, deleteById };
