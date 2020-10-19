const DB = require('../../common/inMemoryDB');
const Task = require('./task.model');
let dbTasks = DB.Tasks;
const SERVER_ERROR = require('../../utils/errorsHandler');

const getAll = async boardId => {
  const tasks = dbTasks.filter(i => i.boardId === boardId.toString());

  return tasks;
};

const getById = async (boardId, id) => {
  const tasks = await getAll(boardId.toString());
  const tasksById = tasks.filter(i => i.id === id.toString())[0];

  if (!tasksById) {
    throw new SERVER_ERROR({ status: 404, message: 'Task not found' });
  }

  return tasksById;
};

const create = async (boardId, body) => {
  const task = Task.fromRequest(body);

  task.boardId = boardId.toString();
  dbTasks.push(task);

  const dbTask = await getById(task.boardId, task.id);
  if (!dbTask) {
    throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
  }

  return dbTask;
};

const update = async (boardId, id, body) => {
  const task = await getById(boardId.toString(), id.toString());
  if (!task) {
    throw new SERVER_ERROR({ status: 404, message: 'Task not found' });
  }

  for (const [key, value] of Object.entries(body)) {
    task[key] = value;
  }
  let idTask = dbTasks[id.toString()];
  idTask = task;

  if (!idTask) {
    throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
  }

  return task;
};

const deleteById = async (boardId, id) => {
  const task = await getById(boardId.toString(), id.toString());
  if (!task) {
    throw new SERVER_ERROR({ status: 404, message: 'Task not found' });
  }
  const index = dbTasks.indexOf(task);

  dbTasks.splice(index, 1);
  return true;
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
