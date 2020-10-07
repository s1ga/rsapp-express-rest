const usersRepo = require('../repository/user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);
module.exports = { getAll, getById };
