const Task = require('./task.model');

const getAll = async boardId => {
  return Task.find({ boardId });
};

const getById = async (boardId, id) => {
  return Task.findOne({ _id: id, boardId });
};

const create = async (boardId, body) => {
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
  return Task.deleteMany({ boardId });
};

const nullUserTasks = async userId => {
  return Task.updateMany({ userId }, { userId: null });
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
