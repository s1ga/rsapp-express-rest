const usersRepo = require('./user.db.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = body => usersRepo.create(body);

const update = (id, body) => usersRepo.update(id, body);

const deleteById = id => usersRepo.deleteById(id);

module.exports = { getAll, getById, create, update, deleteById };
