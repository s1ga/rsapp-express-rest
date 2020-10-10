const DB = require('../common/inMemoryDB');
const Board = require('../models/board.model');
const dbBoards = DB.Boards;
const dbTasks = DB.Tasks;

const getAll = async () => {
  return dbBoards;
};

const getById = async id => {
  try {
    const board = await dbBoards.filter(
      i => i.id.toString() === id.toString()
    )[0];

    // if (!board) {
    //   return null;
    // }

    return board;
  } catch (e) {
    console.log(e);
  }
};

const create = async body => {
  try {
    const board = Board.fromRequest(body);
    await dbBoards.push(board);
    const dbBoard = await getById(board.id);

    if (!dbBoard) {
      throw new Error('Board not created');
    }

    return dbBoard;
  } catch (e) {
    console.log(e);
  }
};

const update = async (id, body) => {
  try {
    const board = await getById(id);
    // if (!board) {
    //   throw new Error('Board not found');
    // }

    for (const [key, value] of Object.entries(body)) {
      board[key] = value;
    }
    dbBoards[id.toString()] = board;

    return board;
  } catch (e) {
    console.log(e);
  }
};

const deleteById = async id => {
  try {
    const board = await getById(id);
    const index = dbBoards.indexOf(board);

    if (index < 0) {
      return null;
    }

    // there should be a logic of deleting a Task
    dbTasks.map((item, idx, arr) => {
      if (item.boardId === id) {
        dbTasks.splice(idx, 1);
      }
      return arr;
    });

    dbBoards.splice(index, 1);
    return true;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getAll, getById, create, update, deleteById };
