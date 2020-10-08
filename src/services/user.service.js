const usersRepo = require('../repository/user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = body => usersRepo.create(body);

module.exports = { getAll, getById, create };
