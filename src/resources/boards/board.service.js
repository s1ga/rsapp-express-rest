const boardsRepo = require('./board.db.repository');

const getAll = () => boardsRepo.getAll();
const getById = id => boardsRepo.getById(id);
const create = body => boardsRepo.create(body);
const update = (id, body) => boardsRepo.update(id, body);
const deleteById = id => boardsRepo.deleteById(id);

module.exports = { getAll, getById, create, update, deleteById };
