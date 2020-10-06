const usersRepo = require('../repository/user.memory.repository');

const getAll = () => usersRepo.getAll();

module.exports = { getAll };
