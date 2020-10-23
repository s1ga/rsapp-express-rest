const Task = require('./task.model');
const SERVER_ERROR = require('../../utils/errorsHandler');

const getAll = async boardId => {
  const tasks = await Task.find({ boardId });

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

  await task.save();
  return task;

  //   const task = Task.fromRequest(body);
  //   task.boardId = boardId.toString();
  //   dbTasks.push(task);
  //   const dbTask = await getById(task.boardId, task.id);
  //   if (!dbTask) {
  //     throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
  //   }
  //   return dbTask;
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
  //   const task = await getById(boardId.toString(), id.toString());
  //   if (!task) {
  //     throw new SERVER_ERROR({ status: 404, message: 'Task not found' });
  //   }

  //   for (const [key, value] of Object.entries(body)) {
  //     task[key] = value;
  //   }
  //   let idTask = dbTasks[id.toString()];
  //   idTask = task;

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

  return await Task.deleteOne({
    _id: id,
    boardId
  });
};

const deleteByBoardId = async boardId => {
  const boardTasks = await Task.find({ boardId });
  console.log(boardTasks);
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
