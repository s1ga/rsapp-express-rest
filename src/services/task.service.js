const taskRepo = require('../repository/task.memory.repository');

const getAll = boardId => taskRepo.getAll(boardId);
const getById = (boardId, id) => taskRepo.getById(boardId, id);
const create = (boardId, body) => taskRepo.create(boardId, body);
const update = (boardId, id, body) => taskRepo.update(boardId, id, body);
const deleteById = (boardId, id) => taskRepo.deleteById(boardId, id);
const deleteByBoardId = boardId => taskRepo.deleteByBoardId(boardId);

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  deleteByBoardId
};
