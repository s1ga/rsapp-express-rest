const DB = require('../../common/inMemoryDB');
const Board = require('./board.model');
const taskService = require('../tasks/task.service');
const dbBoards = DB.Boards;

const getAll = async () => {
  return dbBoards;
};

const getById = async id => {
  try {
    const board = await dbBoards.filter(i => i.id === id.toString())[0];

    return board;
  } catch (e) {
    console.log(e.message);
  }
};

const create = async body => {
  try {
    const board = Board.fromRequest(body);

    dbBoards.push(board);
    const dbBoard = await getById(board.id);

    return dbBoard;
  } catch (e) {
    console.log(e.message);
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
    console.log(e.message);
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
    console.log(e.message);
  }
};

module.exports = { getAll, getById, create, update, deleteById };
