const DB = require('../../common/inMemoryDB');
const Task = require('./task.model');
let dbTasks = DB.Tasks;

const getAll = async boardId => {
  const tasks = dbTasks.filter(i => i.boardId === boardId.toString());

  return tasks;
};

const getById = async (boardId, id) => {
  try {
    const tasks = await getAll(boardId.toString());
    const tasksById = tasks.filter(i => i.id === id.toString())[0];

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
    task.boardId = boardId.toString();
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
    const task = await getById(boardId.toString(), id.toString());
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
    const task = await getById(boardId.toString(), id.toString());
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

const deleteByBoardId = async boardId => {
  dbTasks = dbTasks.filter(i => i.boardId !== boardId);
};

const nullUserTasks = async userId => {
  dbTasks.filter(i => i.userId === userId).map(i => (i.userId = null));
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
