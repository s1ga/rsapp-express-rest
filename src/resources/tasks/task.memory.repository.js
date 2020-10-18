const DB = require('../../common/inMemoryDB');
const Task = require('./task.model');
let dbTasks = DB.Tasks;
const { logger } = require('../../utils/logger');

const getAll = async boardId => {
  try {
    const tasks = dbTasks.filter(i => i.boardId === boardId.toString());

    return tasks;
  } catch (e) {
    logger.log('error', e.stack);
  }
};

const getById = async (boardId, id) => {
  try {
    const tasks = await getAll(boardId.toString());
    const tasksById = tasks.filter(i => i.id === id.toString())[0];

    return tasksById;
  } catch (e) {
    logger.log('error', e.stack);
  }
};

const create = async (boardId, body) => {
  try {
    const task = Task.fromRequest(body);

    task.boardId = boardId.toString();
    dbTasks.push(task);

    const dbTask = await getById(task.boardId, task.id);
    return dbTask;
  } catch (e) {
    logger.log('error', e.stack);
  }
};

const update = async (boardId, id, body) => {
  try {
    const task = await getById(boardId.toString(), id.toString());

    for (const [key, value] of Object.entries(body)) {
      task[key] = value;
    }
    dbTasks[id.toString()] = task;

    return task;
  } catch (e) {
    logger.log('error', e.stack);
  }
};

const deleteById = async (boardId, id) => {
  try {
    const task = await getById(boardId.toString(), id.toString());
    const index = dbTasks.indexOf(task);

    if (index < 0) {
      return null;
    }

    dbTasks.splice(index, 1);
    return true;
  } catch (e) {
    logger.log('error', e.stack);
  }
};

const deleteByBoardId = async boardId => {
  try {
    dbTasks = dbTasks.filter(i => i.boardId !== boardId);
  } catch (e) {
    logger.log('error', e.stack);
  }
};

const nullUserTasks = async userId => {
  try {
    dbTasks.filter(i => i.userId === userId).map(i => (i.userId = null));
  } catch (e) {
    logger.log('error', e.stack);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  deleteByBoardId,
  nullUserTasks
};
