const Task = require('./task.model');
const SERVER_ERROR = require('../../utils/errorsHandler');

const getAll = async boardId => {
  const tasks = Task.find({ boardId });

  return tasks;
};

const getById = async (boardId, id) => {
  const task = await Task.findOne({
    _id: id,
    boardId
  });

  if (!task) {
    throw new SERVER_ERROR({ status: 404, message: 'Task not found' });
  }

  return task;
};

const create = async (boardId, body) => {
  const { title, order, description, userId, columnId } = body;
  const task = new Task({
    title,
    order,
    description,
    boardId,
    userId,
    columnId
  });

  if (!task) {
    throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
  }

  task.save();
  return task;
};

const update = async (boardId, id, body) => {
  let task = await Task.findOneAndUpdate(
    {
      _id: id,
      boardId
    },
    body
  );

  task = Task.findById(id);
  if (!task) {
    throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
  }

  return task;
};

const deleteById = async (boardId, id) => {
  const task = await Task.findOne({
    _id: id,
    boardId
  });

  if (!task) {
    throw new SERVER_ERROR({ status: 404, message: 'Task not found' });
  }

  return Task.deleteOne({
    _id: id,
    boardId
  });
};

const deleteByBoardId = async boardId => {
  const boardTasks = await Task.find({ boardId });

  boardTasks.map(i => i.delete());
};

const nullUserTasks = async userId => {
  const userTasks = await Task.find({ userId });

  userTasks.map(i => {
    i.userId = null;
    return i.save();
  });
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
