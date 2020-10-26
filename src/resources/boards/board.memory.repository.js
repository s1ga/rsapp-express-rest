const DB = require('../../common/clientDb');
const Board = require('./board.model');
const taskService = require('../tasks/task.service');
const dbBoards = DB.Boards;
const SERVER_ERROR = require('../../utils/errorsHandler');

const getAll = async () => {
  return dbBoards;
};

const getById = async id => {
  const board = await dbBoards.filter(i => i.id === id.toString())[0];

  if (!board) {
    throw new SERVER_ERROR({ status: 404, message: 'Board not found' });
  }

  return board;
};

const create = async body => {
  const board = Board.fromRequest(body);

  dbBoards.push(board);
  const dbBoard = dbBoards.filter(i => i.id === board.id)[0];

  if (!dbBoard) {
    throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
  }

  return dbBoard;
};

const update = async (id, body) => {
  const board = await getById(id.toString());

  for (const [key, value] of Object.entries(body)) {
    board[key] = value;
  }
  let idBoard = dbBoards[id.toString()];
  idBoard = board;

  if (!idBoard) {
    throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
  }

  return board;
};

const deleteById = async id => {
  const board = await getById(id.toString());
  const index = dbBoards.indexOf(board);

  // there should be a logic of deleting a Task
  await taskService.deleteByBoardId(board.id);

  dbBoards.splice(index, 1);
  return true;
};

module.exports = { getAll, getById, create, update, deleteById };
