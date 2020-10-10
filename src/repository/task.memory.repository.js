const DB = require('../common/inMemoryDB');
const Task = require('../models/task.model');
const dbTasks = DB.Tasks;

const getAll = async boardId => {
  const tasks = dbTasks.filter(i => i.boardId === boardId);

  return tasks;
};

const getById = async (boardId, id) => {
  try {
    const tasks = await getAll(boardId);
    const tasksById = tasks.filter(i => i.id.toString() === id.toString())[0];

    // if (!tasksById) {
    //   return null;
    // }

    return tasksById;
  } catch (e) {
    console.log(e);
  }
};

const create = async (boardId, body) => {
  try {
    const task = Task.fromRequest(body);
    await dbTasks.push(task);
    const dbTask = await getById(task.boardId, task.id);

    if (!dbTask) {
      return null;
    }

    return dbTask;
  } catch (e) {
    console.log(e);
  }
};

const update = async (boardId, id, body) => {
  try {
    const task = await getById(boardId, id);
    if (!task) {
      return null;
    }

    for (const [key, value] of Object.entries(body)) {
      task[key] = value;
    }
    dbTasks[id.toString()] = task;

    return task;
  } catch (e) {
    console.log(e);
  }
};

const deleteById = async (boardId, id) => {
  try {
    const task = await getById(boardId, id);
    const index = dbTasks.indexOf(task);

    if (index < 0) {
      return false;
    }

    dbTasks.splice(index, 1);
    return true;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getAll, getById, create, update, deleteById };
