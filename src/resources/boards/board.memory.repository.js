const DB = require('../../common/inMemoryDB');
const Board = require('./board.model');
const taskService = require('../tasks/task.service');
const dbBoards = DB.Boards;
const { logger } = require('../../utils/logger');

const getAll = async () => {
  try {
    return dbBoards;
  } catch (e) {
    logger.log('error', e.stack);
  }
};

const getById = async id => {
  try {
    const board = await dbBoards.filter(i => i.id === id.toString())[0];

    return board;
  } catch (e) {
    logger.log('error', e.stack);
  }
};

const create = async body => {
  try {
    const board = Board.fromRequest(body);

    dbBoards.push(board);
    const dbBoard = await getById(board.id);

    return dbBoard;
  } catch (e) {
    logger.log('error', e.stack);
  }
};

const update = async (id, body) => {
  try {
    const board = await getById(id.toString());

    if (!board) {
      return null;
    }

    for (const [key, value] of Object.entries(body)) {
      board[key] = value;
    }
    dbBoards[id.toString()] = board;

    return board;
  } catch (e) {
    logger.log('error', e.stack);
  }
};

const deleteById = async id => {
  try {
    const board = await getById(id.toString());
    const index = dbBoards.indexOf(board);

    if (index < 0) {
      return null;
    }

    // there should be a logic of deleting a Task
    await taskService.deleteByBoardId(board.id);

    dbBoards.splice(index, 1);
    return true;
  } catch (e) {
    logger.log('error', e.stack);
  }
};

module.exports = { getAll, getById, create, update, deleteById };
