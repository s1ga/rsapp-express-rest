const Task = require('./task.model');

const getAll = async boardId => {
  return Task.find({ boardId });
};

const getById = async (boardId, id) => {
  return Task.findOne({ _id: id, boardId });
};

const create = async (boardId, body) => {
  // const { title, order, description, userId, columnId } = body;
  // const task = new Task({
  //   title,
  //   order,
  //   description,
  //   boardId,
  //   userId,
  //   columnId
  // });

  // if (!task) {
  //   throw new SERVER_ERROR({ status: 400, message: 'Bad request' });
  // }

  // await task.save();
  // return task;
  const { title, order, description, userId, columnId } = body;
  return Task.create({ title, order, description, userId, boardId, columnId });
};

const update = async (paramBoardId, id, body) => {
  const { title, order, description, userId, boardId, columnId } = body;

  return Task.findOneAndUpdate(
    { _id: id, boardId: paramBoardId },
    { title, order, description, userId, boardId, columnId }
  );
};

const deleteById = async (boardId, id) => {
  return Task.findOneAndDelete({ _id: id, boardId });
};

const deleteByBoardId = async boardId => {
  const boardTasks = await Task.find({ boardId });

  boardTasks.map(i => i.remove());
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
